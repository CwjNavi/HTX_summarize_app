import { Skeleton } from "./ui/skeleton";

interface SummaryProps {
    summary: string | null;
    isLoading: boolean;
}

// export const Summary = ({summary, isLoading}: SummaryProps) => {
//     return (
//         <div className="mt-4">
//             <h2 className="text-lg font-semibold">Summary</h2>
//             <Skeleton className="bg-gray-400 h-8 w-3xl rounded-xl" />
//         </div>
//     )
// }

export const Summary = ({summary, isLoading}: SummaryProps) => {
    if (isLoading) return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Summary</h2>
            <Skeleton className="bg-gray-400 h-8 w-3xl rounded-xl" />
        </div>
    )

    if (summary === null) return null;

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Summary</h2>
            <p>{summary}</p>
        </div>
    )
}