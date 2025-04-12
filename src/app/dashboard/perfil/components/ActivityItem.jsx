export function ActivityItem({ icon: Icon, title, description }) {
    return (
        <div className="flex gap-3 p-3 border-custom border-[var(--border)] hover:bg-[var(--accent)] rounded-lg transition-colors">
            <div className="w-9 h-9 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[var(--primary)]" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-[var(--foreground)]">{title}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{description}</p>
            </div>
        </div>
    );
}
