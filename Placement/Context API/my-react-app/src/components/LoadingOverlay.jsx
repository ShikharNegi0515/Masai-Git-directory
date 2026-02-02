import { useLoader } from "../context/LoaderContext";

export default function LoadingOverlay() {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return <div className="overlay">Loading...</div>;
}
