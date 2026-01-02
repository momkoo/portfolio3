'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useCallback, useEffect, useState } from 'react';
import { marked, Marked } from 'marked';

// Configure marked for better parsing
const markedInstance = new Marked({
    breaks: true, // Convert \n to <br>
    gfm: true,    // GitHub Flavored Markdown
});

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({
    content,
    onChange,
    placeholder = 'Start writing...',
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-amber-600 underline hover:text-amber-800',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Underline,
        ],
        content,
        immediatelyRender: false, // Fix for React 19 SSR
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const addLink = useCallback(() => {
        const url = window.prompt('Enter URL');
        if (url && editor) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    }, [editor]);

    const removeLink = useCallback(() => {
        if (editor) {
            editor.chain().focus().unsetLink().run();
        }
    }, [editor]);

    const [showMarkdownModal, setShowMarkdownModal] = useState(false);
    const [markdownText, setMarkdownText] = useState('');

    const importMarkdown = useCallback(async () => {
        if (markdownText && editor) {
            const html = await markedInstance.parse(markdownText);
            editor.chain().focus().setContent(html).run();
            setMarkdownText('');
            setShowMarkdownModal(false);
        }
    }, [editor, markdownText]);

    if (!editor) {
        return <div className="animate-pulse bg-gray-100 h-64 rounded-lg" />;
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                {/* Text Style */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        title="Bold"
                    >
                        <strong>B</strong>
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        title="Italic"
                    >
                        <em>I</em>
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        title="Underline"
                    >
                        <u>U</u>
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        title="Strikethrough"
                    >
                        <s>S</s>
                    </ToolbarButton>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        title="Heading 1"
                    >
                        H1
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        title="Heading 2"
                    >
                        H2
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        title="Heading 3"
                    >
                        H3
                    </ToolbarButton>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <span className="text-xs">&#8226; List</span>
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <span className="text-xs">1. List</span>
                    </ToolbarButton>
                </div>

                {/* Block */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        title="Quote"
                    >
                        <span className="text-xs">&ldquo; &rdquo;</span>
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={editor.isActive('codeBlock')}
                        title="Code Block"
                    >
                        <span className="font-mono text-xs">&lt;/&gt;</span>
                    </ToolbarButton>
                </div>

                {/* Media */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <ToolbarButton
                        onClick={addLink}
                        isActive={editor.isActive('link')}
                        title="Add Link"
                    >
                        <span className="text-xs">Link</span>
                    </ToolbarButton>
                    {editor.isActive('link') && (
                        <ToolbarButton onClick={removeLink} title="Remove Link">
                            <span className="text-xs text-red-600">Unlink</span>
                        </ToolbarButton>
                    )}
                    <ToolbarButton onClick={addImage} title="Add Image">
                        <span className="text-xs">Image</span>
                    </ToolbarButton>
                </div>

                {/* History */}
                <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo"
                    >
                        <span className="text-xs">Undo</span>
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo"
                    >
                        <span className="text-xs">Redo</span>
                    </ToolbarButton>
                </div>

                {/* Markdown Import */}
                <div className="flex gap-1">
                    <ToolbarButton
                        onClick={() => setShowMarkdownModal(true)}
                        title="Import Markdown"
                    >
                        <span className="text-xs font-mono">MD</span>
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="bg-white" />

            {/* Footer Info */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-500">
                {editor.storage.characterCount?.characters?.() ?? 0} characters
            </div>

            {/* Markdown Import Modal */}
            {showMarkdownModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-bold text-gray-900">Markdown 가져오기</h3>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowMarkdownModal(false);
                                    setMarkdownText('');
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto">
                            <p className="text-sm text-gray-600 mb-3">
                                Markdown 텍스트를 붙여넣으세요. 자동으로 서식이 적용됩니다.
                            </p>
                            <textarea
                                value={markdownText}
                                onChange={(e) => setMarkdownText(e.target.value)}
                                placeholder="# 제목&#10;&#10;**굵은 글씨**, *기울임*, [링크](url)&#10;&#10;- 목록 아이템&#10;- 또 다른 아이템"
                                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-amber-500 focus:border-amber-500 resize-none"
                            />
                        </div>
                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowMarkdownModal(false);
                                    setMarkdownText('');
                                }}
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                onClick={importMarkdown}
                                disabled={!markdownText.trim()}
                                className="px-4 py-2 text-sm text-white bg-amber-500 rounded-md hover:bg-amber-600 disabled:opacity-50"
                            >
                                가져오기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface ToolbarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title?: string;
    children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`
                px-2 py-1 rounded text-sm font-medium transition-colors
                ${isActive
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {children}
        </button>
    );
}
