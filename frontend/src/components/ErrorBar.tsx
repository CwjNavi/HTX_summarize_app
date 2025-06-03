import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

interface ErrorBarProps {
    errorMessage: string | null;
    currentQuery: string | null;
    onErrorChange: (error: string | null) => void;
}

export const ErrorBar = ({errorMessage, currentQuery, onErrorChange}: ErrorBarProps) => {
    if (errorMessage === null) return null

    return (
        <>
        <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Analysis failed.</AlertTitle>
        <AlertDescription>
          <p>{errorMessage}</p>
          <p>{`Current query: ${currentQuery}`}</p>
        </AlertDescription>
        <Button className="bg-red-200 w-10 " onClick={() => {onErrorChange(null)}}><Trash2 className="stroke-black"></Trash2></Button>
      </Alert>
        </>
    )
}