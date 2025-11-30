import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

import { toolbox } from './blockly_helper/toolbox';
import { save, load } from './blockly_helper/serialization';
import { blocks } from './blockly_helper/blocks/text';
import { forBlock } from './blockly_helper/generators/javascript';

// import { Link } from "react-router-dom";
// import Navbar from "../sections/navbar";
// import Footer from "../sections/Footer";
import './Blockly.css'; 

export default function BlocklyComponent() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  const [activeTab, setActiveTab] = useState('code');
  const [generatedCode, setGeneratedCode] = useState("// Drag blocks to generate code");
  const [consoleOutput, setConsoleOutput] = useState("> Ready.");

  useEffect(() => {
    if (workspaceRef.current) return;

    // 1. REGISTER BLOCKS
    Blockly.common.defineBlocks(blocks);
    Object.assign(javascriptGenerator.forBlock, forBlock);

    // 2. INJECT BLOCKLY
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox,
      trashcan: true,
    
      move: {
        scrollbars: false,
        drag: true,
        wheel: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 1,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
    });

    // 3. LOAD SAVED STATE
    load(workspaceRef.current);

    // 4. LISTENERS
    const handleWorkspaceChange = (e) => {
      if (e.isUiEvent) return;
      save(workspaceRef.current);
      const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
      setGeneratedCode(code || "// Drag blocks to generate code");
    };

    workspaceRef.current.addChangeListener(handleWorkspaceChange);
    
    const initialCode = javascriptGenerator.workspaceToCode(workspaceRef.current);
    setGeneratedCode(initialCode);


  }, []);


  // --- RUN BUTTON LOGIC ---
  const runRealCode = () => {
    setActiveTab('output');
    setConsoleOutput("> Starting...");

    if (!generatedCode || generatedCode.startsWith("// Drag")) {
      setConsoleOutput((prev) => prev + "\n> No blocks found to run!");
      return;
    }

    // <-- REMOVED TRY/CATCH BLOCK
    
    // Hijack alert to print to our console box
    const originalAlert = window.alert;
    window.alert = (message) => {
      setConsoleOutput((prev) => prev + "\n> " + message);
    };

    // Execute the code directly
    // eslint-disable-next-line no-eval
    eval(generatedCode);

    // Restore alert
    window.alert = originalAlert;
    setConsoleOutput((prev) => prev + "\n> Program finished.");
  };

  return (
    <div className="app-container">
      
      {/* HEADER */}
      <header className="app-header">
        <h1 className="app-title">Algo Arcade</h1>
        <div className="header-actions">
          <button onClick={runRealCode} className="btn-run">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Run Code
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <div className="main-workspace">
        
        {/* LEFT: EDITOR */}
        <div className="editor-panel">
          <div ref={blocklyDiv} className="blockly-injection-div" />
        </div>

        {/* RIGHT: OUTPUT PANEL */}
        <div className="output-panel">
          
          {/* TABS */}
          <div className="tabs-header">
            <button
              onClick={() => setActiveTab('code')}
              className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
            >
              Generated Code
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`tab-button ${activeTab === 'output' ? 'active' : ''}`}
            >
              Console Output
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="tab-content-container">
            {/* Generated Code View */}
            <div className={`tab-pane ${activeTab === 'code' ? 'visible' : ''}`}>
              <pre className="code-pre">{generatedCode}</pre>
            </div>
            {/* Console Output View */}
            <div className={`tab-pane ${activeTab === 'output' ? 'visible' : ''}`}>
              <div className="console-output">{consoleOutput}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}