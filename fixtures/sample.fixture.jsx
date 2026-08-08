import { AutoroutingPipelineSolver } from "@tscircuit/capacity-autorouter";
import { getSvgFromGraphicsObject } from "graphics-debug";
import { useEffect, useMemo, useState } from "react";
import sample001 from "../circuits/sample001/sample001.circuit.simple-route.json";
import sample002 from "../circuits/sample002/sample002.circuit.simple-route.json";
import sample003 from "../circuits/sample003/sample003.circuit.simple-route.json";
import sample004 from "../circuits/sample004/sample004.circuit.simple-route.json";
import sample005 from "../circuits/sample005/sample005.circuit.simple-route.json";
import sample006 from "../circuits/sample006/sample006.circuit.simple-route.json";
import sample007 from "../circuits/sample007/sample007.circuit.simple-route.json";
import sample008 from "../circuits/sample008/sample008.circuit.simple-route.json";
import sample009 from "../circuits/sample009/sample009.circuit.simple-route.json";
import sample010 from "../circuits/sample010/sample010.circuit.simple-route.json";

const samples = [
	{ id: "sample001", data: sample001 },
	{ id: "sample002", data: sample002 },
	{ id: "sample003", data: sample003 },
	{ id: "sample004", data: sample004 },
	{ id: "sample005", data: sample005 },
	{ id: "sample006", data: sample006 },
	{ id: "sample007", data: sample007 },
	{ id: "sample008", data: sample008 },
	{ id: "sample009", data: sample009 },
	{ id: "sample010", data: sample010 },
];

const defaultSampleId = samples[0].id;

function getUrlWindow() {
	if (typeof window === "undefined") return null;

	try {
		if (
			window.parent !== window &&
			window.parent.location.origin === window.location.origin
		) {
			return window.parent;
		}
	} catch {
		// Fall back to the fixture window if the parent is not same-origin.
	}

	return window;
}

function getSampleIdFromUrl() {
	const urlWindow = getUrlWindow();
	if (!urlWindow) return defaultSampleId;

	const requestedId = new URL(urlWindow.location.href).searchParams.get(
		"sample",
	);
	return samples.some(({ id }) => id === requestedId)
		? requestedId
		: defaultSampleId;
}

function writeSampleIdToUrl(sampleId, mode) {
	const urlWindow = getUrlWindow();
	if (!urlWindow) return;

	const url = new URL(urlWindow.location.href);
	if (url.searchParams.get("sample") === sampleId) return;

	url.searchParams.set("sample", sampleId);
	urlWindow.history[mode]({}, "", url);
}

export default function SampleFixture() {
	const [selectedSampleId, setSelectedSampleId] = useState(getSampleIdFromUrl);
	const selectedIndex = samples.findIndex(({ id }) => id === selectedSampleId);
	const selectedSample = samples[selectedIndex] ?? samples[0];

	useEffect(() => {
		writeSampleIdToUrl(selectedSample.id, "replaceState");

		const urlWindow = getUrlWindow();
		if (!urlWindow) return;

		const handlePopState = () => setSelectedSampleId(getSampleIdFromUrl());
		urlWindow.addEventListener("popstate", handlePopState);
		return () => urlWindow.removeEventListener("popstate", handlePopState);
	}, [selectedSample.id]);

	const svg = useMemo(() => {
		const boundsWidth =
			selectedSample.data.bounds.maxX - selectedSample.data.bounds.minX;
		const boundsHeight =
			selectedSample.data.bounds.maxY - selectedSample.data.bounds.minY;
		const svgHeight = 1000;
		const svgWidth = Math.round(svgHeight * (boundsWidth / boundsHeight));
		const solver = new AutoroutingPipelineSolver(
			structuredClone(selectedSample.data),
		);
		return getSvgFromGraphicsObject(solver.visualize(), {
			backgroundColor: "#ffffff",
			svgWidth,
			svgHeight,
		});
	}, [selectedSample.data]);

	const selectSample = (sampleId) => {
		if (sampleId === selectedSample.id) return;
		setSelectedSampleId(sampleId);
		writeSampleIdToUrl(sampleId, "pushState");
	};

	return (
		<main className="srj12-browser">
			<style>{`
				html, body, #root {
					width: 100%;
					height: 100%;
					margin: 0;
				}

				* {
					box-sizing: border-box;
				}

				.srj12-browser {
					display: flex;
					flex-direction: column;
					gap: 14px;
					width: 100%;
					height: 100vh;
					min-height: 420px;
					padding: clamp(12px, 2.5vw, 24px);
					overflow: hidden;
					background: #f3f5f7;
					color: #17202a;
					font-family: Inter, ui-sans-serif, system-ui, sans-serif;
				}

				.srj12-header {
					display: flex;
					flex: 0 0 auto;
					flex-wrap: wrap;
					align-items: end;
					justify-content: space-between;
					gap: 12px 20px;
				}

				.srj12-heading {
					margin: 0;
					font-size: clamp(20px, 3vw, 30px);
					line-height: 1.1;
				}

				.srj12-summary {
					margin: 5px 0 0;
					color: #59636e;
					font-size: 14px;
				}

				.srj12-controls {
					display: flex;
					align-items: end;
					gap: 8px;
				}

				.srj12-select-label {
					display: grid;
					gap: 4px;
					color: #59636e;
					font-size: 12px;
					font-weight: 650;
					letter-spacing: 0.04em;
					text-transform: uppercase;
				}

				.srj12-select,
				.srj12-button {
					height: 38px;
					border: 1px solid #c7cdd4;
					border-radius: 8px;
					background: #ffffff;
					color: #17202a;
					font: inherit;
				}

				.srj12-select {
					min-width: 150px;
					padding: 0 34px 0 11px;
				}

				.srj12-button {
					width: 38px;
					padding: 0;
					font-size: 20px;
					line-height: 1;
					cursor: pointer;
				}

				.srj12-button:hover:not(:disabled),
				.srj12-select:hover {
					border-color: #74808c;
				}

				.srj12-button:focus-visible,
				.srj12-select:focus-visible {
					outline: 3px solid rgba(37, 99, 235, 0.25);
					outline-offset: 1px;
				}

				.srj12-button:disabled {
					cursor: default;
					opacity: 0.35;
				}

				.srj12-canvas {
					flex: 1 1 auto;
					min-width: 0;
					min-height: 0;
					overflow: hidden;
					border: 1px solid #d9dee3;
					border-radius: 12px;
					background: #ffffff;
					box-shadow: 0 3px 14px rgba(23, 32, 42, 0.07);
				}

				.srj12-svg,
				.srj12-svg > svg {
					display: block;
					width: 100%;
					height: 100%;
					max-width: none;
				}

				@media (max-width: 560px) {
					.srj12-header,
					.srj12-controls {
						align-items: stretch;
					}

					.srj12-controls {
						width: 100%;
					}

					.srj12-select-label {
						flex: 1;
					}

					.srj12-select {
						width: 100%;
						min-width: 0;
					}
				}
			`}</style>

			<header className="srj12-header">
				<div>
					<h1 className="srj12-heading">SRJ12 · Bus routing</h1>
					<p className="srj12-summary" aria-live="polite">
						{selectedSample.id} · {selectedSample.data.obstacles.length}{" "}
						obstacles
						{" · "}
						{selectedSample.data.connections.length} connections
					</p>
				</div>

				<div className="srj12-controls">
					<button
						className="srj12-button"
						type="button"
						disabled={selectedIndex === 0}
						onClick={() => selectSample(samples[selectedIndex - 1].id)}
						aria-label="Previous sample"
					>
						‹
					</button>

					<label className="srj12-select-label">
						Sample
						<select
							className="srj12-select"
							value={selectedSample.id}
							onChange={(event) => selectSample(event.target.value)}
						>
							{samples.map(({ id, data }) => (
								<option key={id} value={id}>
									{id} · {data.connections.length} connections
								</option>
							))}
						</select>
					</label>

					<button
						className="srj12-button"
						type="button"
						disabled={selectedIndex === samples.length - 1}
						onClick={() => selectSample(samples[selectedIndex + 1].id)}
						aria-label="Next sample"
					>
						›
					</button>
				</div>
			</header>

			<div
				className="srj12-canvas"
				role="img"
				aria-label={`${selectedSample.id} bus-routing visualization`}
			>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: This SVG is generated locally from checked-in SRJ data. */}
				<div dangerouslySetInnerHTML={{ __html: svg }} className="srj12-svg" />
			</div>
		</main>
	);
}
