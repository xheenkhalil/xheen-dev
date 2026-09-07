import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

export function ImageUpload({ images = [], onChange, uploadFn }: { 
  images: string[], 
  onChange: (paths: string[]) => void, 
  uploadFn: (files: {base64: string, filename: string}[]) => Promise<{paths: string[]}> 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    try {
      const filesToUpload = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        filesToUpload.push({ base64: base64.replace(/^data:[^;]+;base64,/, ''), filename: file.name });
      }

      const { paths } = await uploadFn(filesToUpload);
      onChange([...images, ...paths]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative group aspect-video bg-zinc-800 rounded-md overflow-hidden">
            <img src={img} alt={`Upload ${idx}`} className="object-cover w-full h-full" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
        <Button 
          type="button" 
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
        >
          {isUploading ? 'Uploading...' : 'Add Images'}
        </Button>
      </div>
    </div>
  );
}
