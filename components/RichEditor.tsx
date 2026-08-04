'use client';
import React, { useRef, useCallback, useEffect, useState } from 'react';

interface RichEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const TOOLBAR = [
  { cmd: 'bold', icon: '<b>B</b>', title: 'Bold (Ctrl+B)' },
  { cmd: 'italic', icon: '<i>I</i>', title: 'Italic (Ctrl+I)' },
  { cmd: 'underline', icon: '<u>U</u>', title: 'Underline (Ctrl+U)' },
  { cmd: 'strikeThrough', icon: '<s>S</s>', title: 'Strike' },
  { cmd: '|' },
  { cmd: 'formatBlock_h2', icon: 'H2', title: 'Heading 2' },
  { cmd: 'formatBlock_h3', icon: 'H3', title: 'Heading 3' },
  { cmd: 'formatBlock_p', icon: '¶', title: 'Paragraph' },
  { cmd: '|' },
  { cmd: 'insertUnorderedList', icon: '≡', title: 'Bullet List' },
  { cmd: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
  { cmd: '|' },
  { cmd: 'justifyLeft', icon: '⬛▪▪', title: 'Align Left' },
  { cmd: 'justifyCenter', icon: '▪⬛▪', title: 'Align Center' },
  { cmd: 'justifyRight', icon: '▪▪⬛', title: 'Align Right' },
  { cmd: '|' },
  { cmd: 'blockquote', icon: '❝', title: 'Blockquote' },
  { cmd: 'createLink', icon: '🔗', title: 'Insert Link' },
  { cmd: 'removeFormat', icon: '✕F', title: 'Clear Formatting' },
  { cmd: '|' },
  { cmd: 'foreColor_purple', icon: '<span style="color:#7147E8;font-weight:900">A</span>', title: 'Purple Text' },
  { cmd: 'foreColor_reset', icon: '<span style="color:#000;font-weight:900">A</span>', title: 'Black Text' },
  { cmd: 'hiliteColor_yellow', icon: '<mark style="background:#fef08a;padding:0 2px">H</mark>', title: 'Highlight' },
];

export default function RichEditor({ value, onChange, placeholder = 'Write content here...', minHeight = '320px' }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'edit' | 'html'>('edit');
  const isUpdatingRef = useRef(false);

  // Set initial HTML
  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      onChange(editorRef.current.innerHTML);
      setTimeout(() => { isUpdatingRef.current = false; }, 0);
    }
  }, [onChange]);

  const execCmd = useCallback((cmd: string) => {
    editorRef.current?.focus();
    if (cmd.startsWith('formatBlock_')) {
      const tag = cmd.split('_')[1];
      document.execCommand('formatBlock', false, tag);
    } else if (cmd === 'blockquote') {
      document.execCommand('formatBlock', false, 'blockquote');
    } else if (cmd === 'createLink') {
      const url = prompt('Enter URL:', 'https://');
      if (url) document.execCommand('createLink', false, url);
    } else if (cmd === 'foreColor_purple') {
      document.execCommand('foreColor', false, '#7147E8');
    } else if (cmd === 'foreColor_reset') {
      document.execCommand('foreColor', false, '#000000');
    } else if (cmd === 'hiliteColor_yellow') {
      document.execCommand('hiliteColor', false, '#fef08a');
    } else {
      document.execCommand(cmd, false, undefined);
    }
    handleInput();
  }, [handleInput]);

  return (
    <div className="border border-[#EAE3F2] rounded-2xl overflow-hidden bg-white shadow-xs">
      {/* Toolbar */}
      <div className="flex items-center flex-wrap gap-0.5 px-2 py-2 bg-[#FAF8FD] border-b border-[#EAE3F2]">
        {TOOLBAR.map((btn, i) =>
          btn.cmd === '|' ? (
            <div key={i} className="w-px h-5 bg-[#EAE3F2] mx-1" />
          ) : (
            <button
              key={btn.cmd}
              type="button"
              title={btn.title}
              onMouseDown={e => { e.preventDefault(); execCmd(btn.cmd); }}
              className="px-2 py-1 rounded-lg text-[11px] font-bold text-[#4A4268] hover:bg-[#EAE3F2] hover:text-[#7147E8] transition-colors min-w-[26px] text-center leading-tight"
              dangerouslySetInnerHTML={{ __html: btn.icon || btn.cmd }}
            />
          )
        )}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveView('edit')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-colors ${activeView === 'edit' ? 'bg-[#7147E8] text-white' : 'text-[#4A4268] hover:bg-[#EAE3F2]'}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setActiveView('html')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-colors ${activeView === 'html' ? 'bg-[#7147E8] text-white' : 'text-[#4A4268] hover:bg-[#EAE3F2]'}`}
          >
            HTML
          </button>
        </div>
      </div>

      {/* Editor area */}
      {activeView === 'edit' ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          data-placeholder={placeholder}
          className="outline-none p-4 text-sm text-[#1A1338] leading-relaxed overflow-auto"
          style={{
            minHeight,
            fontFamily: 'inherit',
          }}
        />
      ) : (
        <textarea
          className="w-full outline-none p-4 text-xs font-mono text-[#4A4268] resize-y bg-white"
          style={{ minHeight }}
          value={value}
          onChange={e => onChange(e.target.value)}
          spellCheck={false}
        />
      )}

      {/* Footer info */}
      <div className="px-3 py-1.5 bg-[#FAF8FD] border-t border-[#EAE3F2] text-[10px] text-gray-400 font-semibold flex items-center justify-between">
        <span>Rich Text Editor · Use toolbar or keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)</span>
        <span>{value.replace(/<[^>]*>/g, '').length} chars</span>
      </div>

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        [contenteditable] h2 { font-family: Georgia, serif; font-size: 1.4rem; font-weight: 800; margin: 1rem 0 0.5rem; color: #1A1338; }
        [contenteditable] h3 { font-family: Georgia, serif; font-size: 1.1rem; font-weight: 700; margin: 0.8rem 0 0.3rem; color: #1A1338; }
        [contenteditable] blockquote { border-left: 3px solid #7147E8; padding-left: 1rem; margin: 0.8rem 0; color: #68607F; font-style: italic; }
        [contenteditable] ul { padding-left: 1.4rem; margin: 0.5rem 0; list-style-type: disc; }
        [contenteditable] ol { padding-left: 1.4rem; margin: 0.5rem 0; list-style-type: decimal; }
        [contenteditable] li { margin-bottom: 0.25rem; }
        [contenteditable] a { color: #7147E8; text-decoration: underline; }
      `}</style>
    </div>
  );
}
