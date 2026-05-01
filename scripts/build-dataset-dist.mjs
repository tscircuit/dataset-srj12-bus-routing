import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { AutoroutingPipelineSolver4 } from "@tscircuit/capacity-autorouter"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "..")
const circuitsDir = path.join(repoRoot, "circuits")
const datasetDistDir = path.join(repoRoot, "dataset-dist")
const autorouterPkg = JSON.parse(
  await readFile(
    path.join(
      repoRoot,
      "node_modules/@tscircuit/capacity-autorouter/package.json",
    ),
    "utf8",
  ),
)

function jsonClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function normalizeSolverInput(params) {
  const regions = params.graph.regions.map((region) => ({
    regionId: region.regionId,
    d: jsonClone(region.d),
    portIds: region.ports.map((port) => port.portId),
  }))

  const ports = params.graph.ports.map((port) => {
    const { regions: _regions, ...portData } = port.d
    return {
      portId: port.portId,
      d: jsonClone(portData),
      region1Id: port.region1.regionId,
      region2Id: port.region2.regionId,
      regionIds: port.d.regions.map((region) => region.regionId),
    }
  })

  const connections = params.connections.map((connection) => ({
    connectionId: connection.connectionId,
    mutuallyConnectedNetworkId: connection.mutuallyConnectedNetworkId,
    startRegionId: connection.startRegion.regionId,
    endRegionId: connection.endRegion.regionId,
    simpleRouteConnection: jsonClone(connection.simpleRouteConnection),
  }))

  const { graph: _graph, connections: _connections, ...rest } = params

  return {
    graph: {
      regions,
      ports,
    },
    connections,
    ...jsonClone(rest),
  }
}

function getResultSummary(solver, portPointPathingSolver) {
  const output = portPointPathingSolver.getOutput()
  const input = portPointPathingSolver.getConstructorParams()[0]

  return {
    solved: portPointPathingSolver.solved,
    failed: portPointPathingSolver.failed,
    error: portPointPathingSolver.error,
    iterations: portPointPathingSolver.iterations,
    timeToSolve: portPointPathingSolver.timeToSolve ?? null,
    pipelineIterations: solver.iterations,
    nextPipelinePhase: solver.getCurrentPhase(),
    regionCount: input.graph.regions.length,
    portCount: input.graph.ports.length,
    connectionCount: input.connections.length,
    outputNodeCount: output.nodesWithPortPoints.length,
    inputNodeCount: output.inputNodeWithPortPoints.length,
  }
}

async function getSrjFiles() {
  const circuitNames = (await readdir(circuitsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  return circuitNames.map((sampleName) => ({
    sampleName,
    srjPath: path.join(
      circuitsDir,
      sampleName,
      `${sampleName}.circuit.simple-route.json`,
    ),
    sourceFile: `circuits/${sampleName}/${sampleName}.circuit.simple-route.json`,
    outputFile: `${sampleName}.tiny-hypergraph.json`,
  }))
}

async function buildCase({ sampleName, srjPath, sourceFile, outputFile }) {
  const srj = JSON.parse(await readFile(srjPath, "utf8"))
  const solver = new AutoroutingPipelineSolver4(srj)

  while (
    !(solver.portPointPathingSolver?.solved || solver.portPointPathingSolver?.failed)
  ) {
    solver.step()
  }

  const portPointPathingSolver = solver.portPointPathingSolver

  if (!portPointPathingSolver?.solved) {
    throw new Error(
      `${sampleName} portPointPathingSolver did not solve: ${
        portPointPathingSolver?.error ?? "solver was not created"
      }`,
    )
  }

  const solverInput = normalizeSolverInput(
    portPointPathingSolver.getConstructorParams()[0],
  )
  const resultSummary = getResultSummary(solver, portPointPathingSolver)

  const benchmarkCase = {
    sampleName,
    sourceFile,
    outputFile: `dataset-dist/${outputFile}`,
    generatedBy: {
      pipeline: "AutoroutingPipelineSolver4_TinyHypergraph",
      phase: "portPointPathingSolver",
      autorouterPackage: "@tscircuit/capacity-autorouter",
      autorouterVersion: autorouterPkg.version,
    },
    solverInput,
    stats: jsonClone(portPointPathingSolver.stats),
    resultSummary,
  }

  await writeFile(
    path.join(datasetDistDir, outputFile),
    `${JSON.stringify(benchmarkCase, null, 2)}\n`,
  )

  return {
    sampleName,
    sourceFile,
    outputFile: `dataset-dist/${outputFile}`,
    stats: benchmarkCase.stats,
    resultSummary,
  }
}

await rm(datasetDistDir, { recursive: true, force: true })
await mkdir(datasetDistDir, { recursive: true })

const manifest = []

for (const srjFile of await getSrjFiles()) {
  console.log(`Building ${srjFile.sampleName}`)
  manifest.push(await buildCase(srjFile))
}

await writeFile(
  path.join(datasetDistDir, "manifest.json"),
  `${JSON.stringify(
    {
      generatedBy: {
        pipeline: "AutoroutingPipelineSolver4_TinyHypergraph",
        phase: "portPointPathingSolver",
        autorouterPackage: "@tscircuit/capacity-autorouter",
        autorouterVersion: autorouterPkg.version,
      },
      cases: manifest,
    },
    null,
    2,
  )}\n`,
)
