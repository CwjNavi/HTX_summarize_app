interface SummaryProps {
    summary: string | null
}

export const Summary = ({summary}: SummaryProps) => {
    if (!summary) return null;

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Summary</h2>
            <p>{summary}</p>
        </div>
    )
}