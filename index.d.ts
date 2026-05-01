type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

export interface TinyHypergraphBenchmarkCase {
  sampleName: string
  sourceFile: string
  outputFile: string
  generatedBy: {
    pipeline: "AutoroutingPipelineSolver4_TinyHypergraph"
    phase: "portPointPathingSolver"
    autorouterPackage: "@tscircuit/capacity-autorouter"
    autorouterVersion: string
  }
  solverInput: JsonValue
  stats: Record<string, JsonValue>
  resultSummary: Record<string, JsonValue>
}

export const sample001Srj: JsonValue
export const sample002Srj: JsonValue
export const sample003Srj: JsonValue
export const sample004Srj: JsonValue
export const sample005Srj: JsonValue
export const sample006Srj: JsonValue
export const sample007Srj: JsonValue
export const sample008Srj: JsonValue
export const sample009Srj: JsonValue
export const sample010Srj: JsonValue

export const sample001TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample002TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample003TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample004TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample005TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample006TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample007TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample008TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample009TinyHypergraph: TinyHypergraphBenchmarkCase
export const sample010TinyHypergraph: TinyHypergraphBenchmarkCase

export const datasetDistManifest: JsonValue
export const srjByName: Record<string, JsonValue>
export const tinyHypergraphBenchmarkByName: Record<
  string,
  TinyHypergraphBenchmarkCase
>
export const samples: Array<{
  sampleName: string
  srj: JsonValue
  tinyHypergraphBenchmark: TinyHypergraphBenchmarkCase
}>

export function hydrateTinyHypergraphSolverInput(solverInput: JsonValue): any
