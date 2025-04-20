// src/components/missions/common/CodeEditor.jsx
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import * as monaco from 'monaco-editor';
import { FaSyncAlt, FaDownload } from 'react-icons/fa';

// Register Monaco themes - dark theme optimized for code
const registerThemes = () => {
  monaco.editor.defineTheme('techOdyssey', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'operator', foreground: 'D4D4D4' },
      { token: 'function', foreground: 'DCDCAA' },
      { token: 'variable', foreground: '9CDCFE' },
      { token: 'type', foreground: '4EC9B0' },
    ],
    colors: {
      'editor.background': '#1E1E2E',
      'editor.foreground': '#D4D4D4',
      'editorLineNumber.foreground': '#6D6D6D',
      'editor.lineHighlightBackground': '#2D2D4D',
      'editorCursor.foreground': '#FFFFFF',
      'editor.selectionBackground': '#264F78',
      'editor.inactiveSelectionBackground': '#264F7880',
      'editorSuggestWidget.background': '#252526',
      'editorSuggestWidget.border': '#454545',
      'editorSuggestWidget.foreground': '#D4D4D4',
      'editorSuggestWidget.selectedBackground': '#062F4A',
      'editorSuggestWidget.highlightForeground': '#18A3FF',
    }
  });
};

/**
 * Code editor component using Monaco Editor
 */
const CodeEditor = ({
  language = 'javascript',
  value,
  onChange,
  readOnly = false,
  height = '400px',
  placeholder = '',
  showLineNumbers = true,
  showMinimap = false,
  onRunCode = null,
  autoFocus = true,
  fontSize = 14
}) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Register custom themes
    registerThemes();
    
    // Create editor
    if (containerRef.current) {
      const editor = monaco.editor.create(containerRef.current, {
        value: value || placeholder,
        language,
        theme: 'techOdyssey',
        automaticLayout: true,
        minimap: {
          enabled: showMinimap
        },
        lineNumbers: showLineNumbers ? 'on' : 'off',
        readOnly,
        scrollBeyondLastLine: false,
        fontSize,
        tabSize: 2,
        wordWrap: 'on',
        padding: { top: 12 },
        scrollbar: {
          useShadows: false,
          verticalHasArrows: true,
          horizontalHasArrows: true,
          vertical: 'visible',
          horizontal: 'visible',
          verticalScrollbarSize: 14,
          horizontalScrollbarSize: 14
        }
      });
      
      // Save reference to destroy later
      editorRef.current = editor;
      
      // Listen for changes
      editor.onDidChangeModelContent(() => {
        if (onChange) {
          onChange(editor.getValue());
        }
      });
      
      // Set focus on editor
      if (autoFocus) {
        editor.focus();
      }
      
      // Handle keyboard shortcuts
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        // Save logic (currently just prevents browser save dialog)
      });
      
      // Add run shortcut if specified
      if (onRunCode) {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, onRunCode);
      }
    }
    
    return () => {
      // Cleanup
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, [language]); // Only recreate on language change
  
  // Update value when prop changes
  useEffect(() => {
    if (editorRef.current && value !== undefined && editorRef.current.getValue() !== value) {
      editorRef.current.setValue(value);
    }
  }, [value]);
  
  // Format code
  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };
  
  // Handle download code
  const downloadCode = () => {
    if (!editorRef.current) return;
    
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    // Generate appropriate filename based on language
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      cpp: 'cpp',
      php: 'php',
      ruby: 'rb',
      html: 'html',
      css: 'css',
      dockerfile: 'Dockerfile',
      yaml: 'yml',
      nginx: 'conf'
    };
    
    const extension = extensions[language] || 'txt';
    a.download = `code.${extension}`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Editor toolbar */}
      {!readOnly && (
        <div className="flex justify-between items-center p-2 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center space-x-1">
            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 font-mono">
              {language}
            </span>
            
            {onRunCode && (
              <button 
                onClick={onRunCode}
                className="px-3 py-1 bg-green-700 hover:bg-green-600 text-xs text-white rounded flex items-center"
              >
                <span className="mr-1">►</span> Run
              </button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={formatCode}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Format code"
            >
              <FaSyncAlt size={14} />
            </button>
            
            <button
              onClick={downloadCode}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Download code"
            >
              <FaDownload size={14} />
            </button>
          </div>
        </div>
      )}
      
      {/* Editor container */}
      <div
        ref={containerRef}
        className="flex-grow"
        style={{ height }}
      ></div>
    </motion.div>
  );
};

CodeEditor.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  height: PropTypes.string,
  placeholder: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showMinimap: PropTypes.bool,
  onRunCode: PropTypes.func,
  autoFocus: PropTypes.bool,
  fontSize: PropTypes.number
};

export default CodeEditor;