import { useState, KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function TagInput({ value = [], onChange, placeholder = 'Type and press Enter' }: { value: string[], onChange: (tags: string[]) => void, placeholder?: string }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = inputValue.trim();
      if (val && !value.includes(val)) {
        onChange([...value, val]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map(tag => (
          <Badge key={tag} className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700 cursor-pointer flex items-center gap-1 border-none" onClick={() => removeTag(tag)}>
            {tag}
            <span className="text-zinc-400 hover:text-zinc-100">×</span>
          </Badge>
        ))}
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-zinc-800 border-zinc-700 text-zinc-100 focus-visible:ring-emerald-500"
      />
    </div>
  );
}
