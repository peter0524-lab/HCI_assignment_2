
import React from 'react';
import { marked } from 'marked';

interface DocumentViewerProps {
    content: string;
}

// Basic sanitizer to prevent XSS from markdown content
const sanitize = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    const scripts = temp.getElementsByTagName('script');
    while (scripts.length) {
        scripts[0].parentNode?.removeChild(scripts[0]);
    }
    
    // You could add more sanitization rules here if needed
    
    return temp.innerHTML;
}


export const DocumentViewer: React.FC<DocumentViewerProps> = ({ content }) => {
    const getHTML = () => {
        if (!content) return { __html: '<p class="text-gray-400">Your generated document will appear here...</p>'};
        const rawMarkup = marked.parse(content, { gfm: true, breaks: true });
        const sanitizedMarkup = sanitize(rawMarkup as string);
        return { __html: sanitizedMarkup };
    };

    return (
        <div className="prose prose-blue dark:prose-invert max-w-none p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 min-h-[200px]">
            <div dangerouslySetInnerHTML={getHTML()} />
        </div>
    );
};
