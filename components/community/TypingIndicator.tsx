export default function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 text-xs text-on-surface-variant">
      <span className="font-medium">{name} is typing</span>
      <div className="flex items-center gap-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-dot-1" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-dot-2" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-dot-3" />
      </div>
    </div>
  );
}
