import React, { useState, useRef } from 'react';
import { Page } from '../../types';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import ListBulletIcon from '../icons/ListBulletIcon';
import LinkIcon from '../icons/LinkIcon';

interface PagesManagementProps {
    pages: Page[];
    onUpdatePages: (pages: Page[]) => void;
}

const EditorToolbar: React.FC<{ onWrap: (tag: string, arg?: string) => void }> = ({ onWrap }) => {
    return (
        <div className="flex items-center gap-2 p-1 bg-theme-border rounded-t-md border-b border-theme-border/50">
            <button type="button" onClick={() => onWrap('b')} className="p-2 hover:bg-theme-surface rounded-md font-bold">B</button>
            <button type="button" onClick={() => onWrap('i')} className="p-2 hover:bg-theme-surface rounded-md italic">I</button>
            <button type="button" onClick={() => onWrap('ul')} className="p-2 hover:bg-theme-surface rounded-md"><ListBulletIcon className="h-5 w-5"/></button>
            <button type="button" onClick={() => {
                const url = prompt("Enter the URL:");
                if (url) onWrap('a', url);
            }} className="p-2 hover:bg-theme-surface rounded-md"><LinkIcon className="h-5 w-5"/></button>
        </div>
    );
};

const PagesManagement: React.FC<PagesManagementProps> = ({ pages: initialPages, onUpdatePages }) => {
    const [pages, setPages] = useState(initialPages);
    const [editingPage, setEditingPage] = useState<Page | null>(null);
    const [showSaved, setShowSaved] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handleSave = () => {
        onUpdatePages(pages);
        setEditingPage(null);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleAddNew = () => {
        const newPage: Page = {
            id: `p${Date.now()}`,
            title: 'New Page',
            slug: 'new-page',
            content: '<p>Start writing your content here...</p>',
            status: 'draft',
            isVisibleInMenu: false,
            metaTitle: 'New Page Title',
            metaDescription: 'Description for the new page.'
        };
        setPages([...pages, newPage]);
        setEditingPage(newPage);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            const newPages = pages.filter(p => p.id !== id);
            setPages(newPages);
            onUpdatePages(newPages);
        }
    };
    
    const handleEditorChange = (field: keyof Page, value: string | boolean) => {
        if (editingPage) {
            const updatedPage = { ...editingPage, [field]: value };
            setEditingPage(updatedPage);
            setPages(pages.map(p => p.id === updatedPage.id ? updatedPage : p));
        }
    };

    const handleWrapText = (tag: string, arg?: string) => {
        const textarea = contentRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd, value } = textarea;
        const selectedText = value.substring(selectionStart, selectionEnd);
        
        let newText;
        if (tag === 'ul') {
             newText = `<ul>\n  <li>${selectedText.replace(/\n/g, '</li>\n  <li>')}</li>\n</ul>`;
        } else if (tag === 'a' && arg) {
            newText = `<a href="${arg}">${selectedText}</a>`;
        } else {
            newText = `<${tag}>${selectedText}</${tag}>`;
        }
        
        const newValue = value.substring(0, selectionStart) + newText + value.substring(selectionEnd);
        handleEditorChange('content', newValue);
    };

    if (editingPage) {
        return (
            <div>
                 <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">
                    {editingPage.id.startsWith('p') ? `Editing: ${editingPage.title}` : 'Add New Page'}
                </h3>
                <div className="space-y-4 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
                    <div>
                        <label className="text-sm text-theme-text-secondary">Page Title</label>
                        <input type="text" value={editingPage.title} onChange={e => handleEditorChange('title', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="text-sm text-theme-text-secondary">URL Slug</label>
                             <input type="text" value={editingPage.slug} onChange={e => handleEditorChange('slug', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1" />
                        </div>
                        <div>
                            <label className="text-sm text-theme-text-secondary">Status</label>
                            <select value={editingPage.status} onChange={e => handleEditorChange('status', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1">
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label className="text-sm text-theme-text-secondary">Content (HTML allowed)</label>
                        <EditorToolbar onWrap={handleWrapText} />
                        <textarea ref={contentRef} rows={10} value={editingPage.content} onChange={e => handleEditorChange('content', e.target.value)} className="w-full bg-theme-border p-2 rounded-b-md mt-0 font-mono text-sm" />
                    </div>
                     <div className="border-t border-theme-border pt-4">
                        <h4 className="text-md font-semibold text-theme-text-primary mb-2">SEO Settings</h4>
                         <div>
                            <label className="text-sm text-theme-text-secondary">Meta Title</label>
                            <input type="text" value={editingPage.metaTitle || ''} onChange={e => handleEditorChange('metaTitle', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1" />
                        </div>
                         <div className="mt-2">
                            <label className="text-sm text-theme-text-secondary">Meta Description</label>
                            <textarea rows={2} value={editingPage.metaDescription || ''} onChange={e => handleEditorChange('metaDescription', e.target.value)} className="w-full bg-theme-border p-2 rounded-md mt-1" />
                        </div>
                    </div>
                     <div className="border-t border-theme-border pt-4 flex items-center gap-2">
                         <input type="checkbox" id="isVisibleInMenu" checked={editingPage.isVisibleInMenu} onChange={e => handleEditorChange('isVisibleInMenu', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-theme-accent-primary focus:ring-theme-accent-primary" />
                         <label htmlFor="isVisibleInMenu" className="text-sm text-theme-text-primary">Show in Main Navigation Menu</label>
                    </div>
                </div>
                 <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingPage(null)} className="bg-theme-border px-4 py-2 rounded-lg font-semibold hover:bg-theme-border/80">Back to List</button>
                    <button onClick={handleSave} className="bg-theme-accent-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">Save Page</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage your website's static pages like Privacy Policy, Terms, etc.</p>
                <div className="flex items-center gap-2">
                 {showSaved && <span className="text-green-500 text-sm">Changes Saved!</span>}
                <button onClick={handleAddNew} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                    <PlusIcon className="h-5 w-5" /> Add New Page
                </button>
                </div>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Title</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Slug</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Status</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(page => (
                            <tr key={page.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                <td className="p-3 font-medium">{page.title}</td>
                                <td className="p-3 font-mono text-xs">/{page.slug}</td>
                                <td className="p-3">
                                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${page.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {page.status}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2">
                                    <button onClick={() => setEditingPage(page)} className="text-xs bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded-full">Edit</button>
                                    <button onClick={() => handleDelete(page.id)} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PagesManagement;