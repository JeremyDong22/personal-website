// BlogEditor — dev-only inline editor for blog posts
// v2: supports all block types (heading, paragraph, list, image, images, iframe)
// Saves back to source JSON via Vite dev server API
// ZH→EN auto-translation via LLM (Anthropic-compatible API)
import { useState, useCallback } from 'react';
import {
  FiSave, FiX, FiPlus, FiTrash2, FiChevronUp, FiChevronDown,
  FiType, FiAlignLeft, FiList, FiImage, FiColumns, FiCode,
  FiLink, FiEdit3, FiGlobe,
} from 'react-icons/fi';

// Block type options for the "add block" menu
const BLOCK_TYPES = [
  { type: 'heading', label: 'Heading', icon: FiType },
  { type: 'paragraph', label: 'Paragraph', icon: FiAlignLeft },
  { type: 'list', label: 'List', icon: FiList },
  { type: 'image', label: 'Image', icon: FiImage },
  { type: 'images', label: 'Image Gallery', icon: FiColumns },
  { type: 'iframe', label: 'Iframe / Embed', icon: FiCode },
];

// Default block templates for each type
const newBlock = (type) => {
  switch (type) {
    case 'heading': return { type: 'heading', level: 2, text: '' };
    case 'paragraph': return { type: 'paragraph', text: '' };
    case 'list': return { type: 'list', items: [''] };
    case 'image': return { type: 'image', src: '', alt: '', caption: '', portrait: false };
    case 'images': return { type: 'images', items: [{ src: '', alt: '' }], caption: '' };
    case 'iframe': return { type: 'iframe', src: '', alt: '', caption: '', height: '520px' };
    default: return { type: 'paragraph', text: '' };
  }
};

// --- Individual block editors ---

const HeadingEditor = ({ block, onChange }) => (
  <div className="space-y-2">
    <div className="flex gap-2 items-center">
      <select
        value={block.level || 2}
        onChange={(e) => onChange({ ...block, level: Number(e.target.value) })}
        className="bg-darker border border-white/20 rounded px-2 py-1 text-sm text-gray-300"
      >
        <option value={2}>H2</option>
        <option value={3}>H3</option>
      </select>
      <input
        type="text"
        value={block.text}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
        className="flex-1 bg-darker border border-white/20 rounded px-3 py-2 text-white font-bold"
        placeholder="Heading text..."
      />
    </div>
  </div>
);

const ParagraphEditor = ({ block, onChange }) => {
  // If block uses parts (inline links), show the parts editor
  if (block.parts) {
    return <PartsEditor block={block} onChange={onChange} />;
  }
  return (
    <div>
      <textarea
        value={block.text || ''}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
        className="w-full bg-darker border border-white/20 rounded px-3 py-2 text-gray-300 min-h-[80px] resize-y"
        placeholder="Paragraph text..."
      />
      <button
        onClick={() => onChange({ ...block, parts: [{ text: block.text || '' }], text: undefined })}
        className="mt-1 text-xs text-gray-500 hover:text-primary flex items-center gap-1"
        title="Convert to parts (for inline links)"
      >
        <FiLink className="w-3 h-3" /> Add inline links
      </button>
    </div>
  );
};

// Parts editor for paragraphs with inline links
const PartsEditor = ({ block, onChange }) => {
  const parts = block.parts || [];

  const updatePart = (idx, field, value) => {
    const updated = parts.map((p, i) => (i === idx ? { ...p, [field]: value } : p));
    onChange({ ...block, parts: updated });
  };

  const addPart = () => onChange({ ...block, parts: [...parts, { text: '' }] });

  const removePart = (idx) => {
    const updated = parts.filter((_, i) => i !== idx);
    // If only one plain text part left, convert back to simple paragraph
    if (updated.length === 1 && !updated[0].href) {
      onChange({ type: 'paragraph', text: updated[0].text });
    } else {
      onChange({ ...block, parts: updated });
    }
  };

  const convertToSimple = () => {
    const plainText = parts.map((p) => p.text).join('');
    onChange({ type: 'paragraph', text: plainText });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Parts (text segments with optional links)</span>
        <button onClick={convertToSimple} className="text-xs text-gray-500 hover:text-red-400">
          Remove links → plain text
        </button>
      </div>
      {parts.map((part, idx) => (
        <div key={idx} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1">
            <input
              type="text"
              value={part.text}
              onChange={(e) => updatePart(idx, 'text', e.target.value)}
              className="w-full bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm"
              placeholder="Text..."
            />
            <input
              type="text"
              value={part.href || ''}
              onChange={(e) => {
                if (e.target.value) updatePart(idx, 'href', e.target.value);
                else {
                  const { href: _, ...rest } = parts[idx];
                  const updated = parts.map((p, i) => (i === idx ? rest : p));
                  onChange({ ...block, parts: updated });
                }
              }}
              className="w-full bg-darker border border-white/10 rounded px-3 py-1 text-primary text-xs"
              placeholder="Link URL (optional)..."
            />
          </div>
          <button onClick={() => removePart(idx)} className="text-gray-600 hover:text-red-400 mt-1">
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button onClick={addPart} className="text-xs text-gray-500 hover:text-primary flex items-center gap-1">
        <FiPlus className="w-3 h-3" /> Add part
      </button>
    </div>
  );
};

const ListEditor = ({ block, onChange }) => {
  const items = block.items || [];
  const updateItem = (idx, value) => {
    const updated = items.map((item, i) => (i === idx ? value : item));
    onChange({ ...block, items: updated });
  };
  const addItem = () => onChange({ ...block, items: [...items, ''] });
  const removeItem = (idx) => onChange({ ...block, items: items.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-start">
          <span className="text-gray-600 mt-2 text-sm">•</span>
          <textarea
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
            className="flex-1 bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm min-h-[36px] resize-y"
          />
          <button onClick={() => removeItem(idx)} className="text-gray-600 hover:text-red-400 mt-1">
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button onClick={addItem} className="text-xs text-gray-500 hover:text-primary flex items-center gap-1">
        <FiPlus className="w-3 h-3" /> Add item
      </button>
    </div>
  );
};

const ImageEditor = ({ block, onChange }) => (
  <div className="space-y-2">
    <input
      type="text"
      value={block.src || ''}
      onChange={(e) => onChange({ ...block, src: e.target.value })}
      className="w-full bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm"
      placeholder="Image path (e.g. /assets/images/blog/...)"
    />
    <div className="flex gap-2">
      <input
        type="text"
        value={block.alt || ''}
        onChange={(e) => onChange({ ...block, alt: e.target.value })}
        className="flex-1 bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm"
        placeholder="Alt text..."
      />
      <label className="flex items-center gap-1.5 text-gray-400 text-xs cursor-pointer">
        <input
          type="checkbox"
          checked={!!block.portrait}
          onChange={(e) => onChange({ ...block, portrait: e.target.checked || undefined })}
          className="accent-primary"
        />
        Portrait
      </label>
    </div>
    <input
      type="text"
      value={block.caption || ''}
      onChange={(e) => onChange({ ...block, caption: e.target.value })}
      className="w-full bg-darker border border-white/10 rounded px-3 py-1 text-gray-400 text-xs"
      placeholder="Caption (optional)..."
    />
    {/* Preview */}
    {block.src && (
      <img src={block.src} alt={block.alt || ''} className="max-h-32 rounded border border-white/10" />
    )}
  </div>
);

const ImagesEditor = ({ block, onChange }) => {
  const items = block.items || [];
  const updateItem = (idx, field, value) => {
    const updated = items.map((img, i) => (i === idx ? { ...img, [field]: value } : img));
    onChange({ ...block, items: updated });
  };
  const addItem = () => onChange({ ...block, items: [...items, { src: '', alt: '' }] });
  const removeItem = (idx) => onChange({ ...block, items: items.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-3">
      {items.map((img, idx) => (
        <div key={idx} className="flex gap-2 items-start border border-white/10 rounded p-2">
          <div className="flex-1 space-y-1">
            <input
              type="text"
              value={img.src || ''}
              onChange={(e) => updateItem(idx, 'src', e.target.value)}
              className="w-full bg-darker border border-white/20 rounded px-2 py-1 text-gray-300 text-xs"
              placeholder="Image path..."
            />
            <input
              type="text"
              value={img.alt || ''}
              onChange={(e) => updateItem(idx, 'alt', e.target.value)}
              className="w-full bg-darker border border-white/10 rounded px-2 py-1 text-gray-400 text-xs"
              placeholder="Alt text..."
            />
          </div>
          {img.src && <img src={img.src} alt="" className="w-12 h-12 rounded object-cover" />}
          <button onClick={() => removeItem(idx)} className="text-gray-600 hover:text-red-400">
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button onClick={addItem} className="text-xs text-gray-500 hover:text-primary flex items-center gap-1">
        <FiPlus className="w-3 h-3" /> Add image
      </button>
      <input
        type="text"
        value={block.caption || ''}
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
        className="w-full bg-darker border border-white/10 rounded px-3 py-1 text-gray-400 text-xs"
        placeholder="Gallery caption (optional)..."
      />
    </div>
  );
};

const IframeEditor = ({ block, onChange }) => (
  <div className="space-y-2">
    <input
      type="text"
      value={block.src || ''}
      onChange={(e) => onChange({ ...block, src: e.target.value })}
      className="w-full bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm"
      placeholder="Iframe src (e.g. /assets/documents/...)"
    />
    <div className="flex gap-2">
      <input
        type="text"
        value={block.alt || ''}
        onChange={(e) => onChange({ ...block, alt: e.target.value })}
        className="flex-1 bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm"
        placeholder="Title / alt text..."
      />
      <input
        type="text"
        value={block.height || '520px'}
        onChange={(e) => onChange({ ...block, height: e.target.value })}
        className="w-24 bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm"
        placeholder="Height"
      />
    </div>
    <input
      type="text"
      value={block.caption || ''}
      onChange={(e) => onChange({ ...block, caption: e.target.value })}
      className="w-full bg-darker border border-white/10 rounded px-3 py-1 text-gray-400 text-xs"
      placeholder="Caption (optional)..."
    />
  </div>
);

// --- Block wrapper with controls ---

const BlockCard = ({ block, index, total, onChange, onDelete, onMove, onInsertBefore }) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const typeInfo = BLOCK_TYPES.find((t) => t.type === block.type) || BLOCK_TYPES[1];
  const Icon = typeInfo.icon;

  const renderEditor = () => {
    switch (block.type) {
      case 'heading': return <HeadingEditor block={block} onChange={onChange} />;
      case 'paragraph': return <ParagraphEditor block={block} onChange={onChange} />;
      case 'list': return <ListEditor block={block} onChange={onChange} />;
      case 'image': return <ImageEditor block={block} onChange={onChange} />;
      case 'images': return <ImagesEditor block={block} onChange={onChange} />;
      case 'iframe': return <IframeEditor block={block} onChange={onChange} />;
      default: return <p className="text-gray-500 text-sm">Unknown block type: {block.type}</p>;
    }
  };

  return (
    <>
      {/* Insert-before button */}
      <div className="relative flex justify-center py-1 group">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-primary"
          title="Insert block above"
        >
          <FiPlus className="w-4 h-4" />
        </button>
        {showAddMenu && (
          <div className="absolute top-8 z-20 bg-darkest border border-white/20 rounded-lg shadow-xl p-2 flex gap-1">
            {BLOCK_TYPES.map((bt) => (
              <button
                key={bt.type}
                onClick={() => { onInsertBefore(bt.type); setShowAddMenu(false); }}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded hover:bg-white/10 text-gray-400 hover:text-primary transition-colors"
                title={bt.label}
              >
                <bt.icon className="w-4 h-4" />
                <span className="text-[10px]">{bt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Block card */}
      <div className="border border-white/10 rounded-xl p-4 bg-dark/40 hover:border-white/20 transition-colors">
        {/* Block header with controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Icon className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{typeInfo.label}</span>
            <span className="text-gray-700">#{index + 1}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onMove(-1)}
              disabled={index === 0}
              className="p-1 text-gray-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
              title="Move up"
            >
              <FiChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => onMove(1)}
              disabled={index === total - 1}
              className="p-1 text-gray-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
              title="Move down"
            >
              <FiChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 text-gray-600 hover:text-red-400 ml-1"
              title="Delete block"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Block content editor */}
        {renderEditor()}
      </div>
    </>
  );
};

// --- Add block button (at bottom) ---

const AddBlockMenu = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center py-4">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-dashed border-white/20 rounded-lg text-gray-500 hover:text-primary hover:border-primary/40 transition-colors text-sm"
        >
          <FiPlus className="w-4 h-4" /> Add block
        </button>
      ) : (
        <div className="bg-darkest border border-white/20 rounded-lg shadow-xl p-3 flex gap-2">
          {BLOCK_TYPES.map((bt) => (
            <button
              key={bt.type}
              onClick={() => { onAdd(bt.type); setOpen(false); }}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded hover:bg-white/10 text-gray-400 hover:text-primary transition-colors"
            >
              <bt.icon className="w-4 h-4" />
              <span className="text-[10px]">{bt.label}</span>
            </button>
          ))}
          <button
            onClick={() => setOpen(false)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded hover:bg-white/10 text-gray-500"
          >
            <FiX className="w-4 h-4" />
            <span className="text-[10px]">Cancel</span>
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main BlogEditor ---

const BlogEditor = ({ post, language, onSave, onCancel }) => {
  const [editedPost, setEditedPost] = useState(() => structuredClone(post));
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const blocks = editedPost.content[language] || [];

  // Update a specific block in the current language
  const updateBlock = useCallback((index, updatedBlock) => {
    setEditedPost((prev) => {
      const next = structuredClone(prev);
      next.content[language][index] = updatedBlock;
      return next;
    });
  }, [language]);

  // Insert a new block at a given position
  const insertBlock = useCallback((index, type) => {
    setEditedPost((prev) => {
      const next = structuredClone(prev);
      next.content[language].splice(index, 0, newBlock(type));
      return next;
    });
  }, [language]);

  // Delete a block
  const deleteBlock = useCallback((index) => {
    setEditedPost((prev) => {
      const next = structuredClone(prev);
      next.content[language].splice(index, 1);
      return next;
    });
  }, [language]);

  // Move a block up (-1) or down (+1)
  const moveBlock = useCallback((index, direction) => {
    setEditedPost((prev) => {
      const next = structuredClone(prev);
      const arr = next.content[language];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return prev;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return next;
    });
  }, [language]);

  // Update metadata
  const updateTitle = (value) => {
    setEditedPost((prev) => {
      const next = structuredClone(prev);
      next.title[language] = value;
      return next;
    });
  };

  const updateExcerpt = (value) => {
    setEditedPost((prev) => {
      const next = structuredClone(prev);
      next.excerpt[language] = value;
      return next;
    });
  };

  const updateDate = (value) => {
    setEditedPost((prev) => ({ ...prev, date: value }));
  };

  // Save to dev server
  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch('/__blog-api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedPost),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      onSave();
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Translate Chinese content → English via LLM API
  const handleTranslate = async () => {
    const zhBlocks = editedPost.content.zh;
    const zhTitle = editedPost.title.zh;
    const zhExcerpt = editedPost.excerpt.zh;
    if (!zhBlocks || zhBlocks.length === 0) {
      setSaveError('No Chinese content to translate');
      return;
    }
    setTranslating(true);
    setSaveError(null);
    try {
      const res = await fetch('/__blog-api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: zhTitle, excerpt: zhExcerpt, blocks: zhBlocks }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Translation failed');

      // Apply translated content to the English fields
      setEditedPost((prev) => {
        const next = structuredClone(prev);
        if (data.title) next.title.en = data.title;
        if (data.excerpt) next.excerpt.en = data.excerpt;
        if (data.blocks) next.content.en = data.blocks;
        return next;
      });
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Editor toolbar */}
      <div className="sticky top-0 z-30 bg-darkest/95 backdrop-blur-md border-b border-white/10 -mx-6 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiEdit3 className="w-5 h-5 text-primary" />
          <span className="text-primary font-medium text-sm">Editing — {language.toUpperCase()}</span>
          <span className="text-gray-600 text-xs">{blocks.length} blocks</span>
        </div>
        <div className="flex items-center gap-3">
          {saveError && <span className="text-red-400 text-xs max-w-xs truncate">{saveError}</span>}
          <button
            onClick={handleTranslate}
            disabled={translating || saving}
            className="px-4 py-1.5 text-sm text-blue-400 hover:text-blue-300 border border-blue-400/30 hover:border-blue-400/50 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            title="Translate Chinese content to English via LLM"
          >
            <FiGlobe className="w-4 h-4" />
            {translating ? 'Translating...' : 'ZH → EN'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-1.5 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || translating}
            className="px-4 py-1.5 text-sm text-darkest bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Metadata editor */}
      <div className="border border-primary/30 rounded-xl p-5 bg-primary/5 space-y-3">
        <h3 className="text-primary text-xs font-medium uppercase tracking-wider mb-3">Post Metadata</h3>
        <div>
          <label className="text-gray-500 text-xs mb-1 block">Title ({language})</label>
          <input
            type="text"
            value={editedPost.title[language] || ''}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full bg-darker border border-white/20 rounded px-3 py-2 text-white font-bold text-lg"
          />
        </div>
        <div>
          <label className="text-gray-500 text-xs mb-1 block">Excerpt ({language})</label>
          <textarea
            value={editedPost.excerpt[language] || ''}
            onChange={(e) => updateExcerpt(e.target.value)}
            className="w-full bg-darker border border-white/20 rounded px-3 py-2 text-gray-300 text-sm min-h-[60px] resize-y"
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="text-gray-500 text-xs mb-1 block">Date</label>
            <input
              type="date"
              value={editedPost.date || ''}
              onChange={(e) => updateDate(e.target.value)}
              className="bg-darker border border-white/20 rounded px-3 py-1.5 text-gray-300 text-sm"
            />
          </div>
          <div>
            <label className="text-gray-500 text-xs mb-1 block">Slug</label>
            <span className="text-gray-500 text-sm">{editedPost.slug}</span>
          </div>
        </div>
      </div>

      {/* Block editors */}
      {blocks.map((block, i) => (
        <BlockCard
          key={`${i}-${block.type}`}
          block={block}
          index={i}
          total={blocks.length}
          onChange={(updated) => updateBlock(i, updated)}
          onDelete={() => deleteBlock(i)}
          onMove={(dir) => moveBlock(i, dir)}
          onInsertBefore={(type) => insertBlock(i, type)}
        />
      ))}

      {/* Add block at end */}
      <AddBlockMenu onAdd={(type) => insertBlock(blocks.length, type)} />
    </div>
  );
};

export default BlogEditor;
