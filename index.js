const sample001Srj = require("./circuits/sample001/sample001.circuit.simple-route.json")
const sample002Srj = require("./circuits/sample002/sample002.circuit.simple-route.json")
const sample003Srj = require("./circuits/sample003/sample003.circuit.simple-route.json")
const sample004Srj = require("./circuits/sample004/sample004.circuit.simple-route.json")
const sample005Srj = require("./circuits/sample005/sample005.circuit.simple-route.json")
const sample006Srj = require("./circuits/sample006/sample006.circuit.simple-route.json")
const sample007Srj = require("./circuits/sample007/sample007.circuit.simple-route.json")
const sample008Srj = require("./circuits/sample008/sample008.circuit.simple-route.json")
const sample009Srj = require("./circuits/sample009/sample009.circuit.simple-route.json")
const sample010Srj = require("./circuits/sample010/sample010.circuit.simple-route.json")

const sample001TinyHypergraph = require("./dataset-dist/sample001.tiny-hypergraph.json")
const sample002TinyHypergraph = require("./dataset-dist/sample002.tiny-hypergraph.json")
const sample003TinyHypergraph = require("./dataset-dist/sample003.tiny-hypergraph.json")
const sample004TinyHypergraph = require("./dataset-dist/sample004.tiny-hypergraph.json")
const sample005TinyHypergraph = require("./dataset-dist/sample005.tiny-hypergraph.json")
const sample006TinyHypergraph = require("./dataset-dist/sample006.tiny-hypergraph.json")
const sample007TinyHypergraph = require("./dataset-dist/sample007.tiny-hypergraph.json")
const sample008TinyHypergraph = require("./dataset-dist/sample008.tiny-hypergraph.json")
const sample009TinyHypergraph = require("./dataset-dist/sample009.tiny-hypergraph.json")
const sample010TinyHypergraph = require("./dataset-dist/sample010.tiny-hypergraph.json")
const datasetDistManifest = require("./dataset-dist/manifest.json")

const srjByName = {
  sample001: sample001Srj,
  sample002: sample002Srj,
  sample003: sample003Srj,
  sample004: sample004Srj,
  sample005: sample005Srj,
  sample006: sample006Srj,
  sample007: sample007Srj,
  sample008: sample008Srj,
  sample009: sample009Srj,
  sample010: sample010Srj,
}

const tinyHypergraphBenchmarkByName = {
  sample001: sample001TinyHypergraph,
  sample002: sample002TinyHypergraph,
  sample003: sample003TinyHypergraph,
  sample004: sample004TinyHypergraph,
  sample005: sample005TinyHypergraph,
  sample006: sample006TinyHypergraph,
  sample007: sample007TinyHypergraph,
  sample008: sample008TinyHypergraph,
  sample009: sample009TinyHypergraph,
  sample010: sample010TinyHypergraph,
}

const samples = Object.keys(srjByName).map((sampleName) => ({
  sampleName,
  srj: srjByName[sampleName],
  tinyHypergraphBenchmark: tinyHypergraphBenchmarkByName[sampleName],
}))

function hydrateTinyHypergraphSolverInput(solverInput) {
  const regionsById = new Map(
    solverInput.graph.regions.map((region) => [
      region.regionId,
      {
        regionId: region.regionId,
        d: region.d,
        ports: [],
      },
    ]),
  )

  const ports = solverInput.graph.ports.map((port) => {
    const region1 = regionsById.get(port.region1Id)
    const region2 = regionsById.get(port.region2Id)

    if (!region1 || !region2) {
      throw new Error(`Could not hydrate port ${port.portId}`)
    }

    const hydratedPort = {
      portId: port.portId,
      d: {
        ...port.d,
        regions: port.regionIds.map((regionId) => regionsById.get(regionId)),
      },
      region1,
      region2,
    }

    region1.ports.push(hydratedPort)
    region2.ports.push(hydratedPort)

    return hydratedPort
  })

  const graph = {
    regions: Array.from(regionsById.values()),
    ports,
  }

  return {
    ...solverInput,
    graph,
    connections: solverInput.connections.map((connection) => {
      const startRegion = regionsById.get(connection.startRegionId)
      const endRegion = regionsById.get(connection.endRegionId)

      if (!startRegion || !endRegion) {
        throw new Error(`Could not hydrate connection ${connection.connectionId}`)
      }

      return {
        connectionId: connection.connectionId,
        mutuallyConnectedNetworkId: connection.mutuallyConnectedNetworkId,
        startRegion,
        endRegion,
        simpleRouteConnection: connection.simpleRouteConnection,
      }
    }),
  }
}

module.exports = {
  sample001Srj,
  sample002Srj,
  sample003Srj,
  sample004Srj,
  sample005Srj,
  sample006Srj,
  sample007Srj,
  sample008Srj,
  sample009Srj,
  sample010Srj,
  sample001TinyHypergraph,
  sample002TinyHypergraph,
  sample003TinyHypergraph,
  sample004TinyHypergraph,
  sample005TinyHypergraph,
  sample006TinyHypergraph,
  sample007TinyHypergraph,
  sample008TinyHypergraph,
  sample009TinyHypergraph,
  sample010TinyHypergraph,
  datasetDistManifest,
  srjByName,
  tinyHypergraphBenchmarkByName,
  samples,
  hydrateTinyHypergraphSolverInput,
}
