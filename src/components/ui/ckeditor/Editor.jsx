'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import CKEditor component (not default export!)
const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor),
  { ssr: false }
);

export default function Editor({ value, onChange, editable }) {
  const [EditorBuild, setEditorBuild] = useState(null);

  useEffect(() => {
    import('@ckeditor/ckeditor5-build-classic').then((mod) => {
      setEditorBuild(() => mod.default);
    });
  }, []);

  if (!EditorBuild) return <p>Loading editor...</p>;

  return (
    <CKEditor
      disabled={!editable}
      editor={EditorBuild}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (onChange) onChange(data);
      }}
      config={{
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'link',
          'bulletedList', 'numberedList', 'blockQuote'
        ]
      }}
    />
  );
}
