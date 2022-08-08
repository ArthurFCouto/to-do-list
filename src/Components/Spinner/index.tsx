interface SpinnerColor {
    color?: "text-primary" | "text-light" | "text-success";
};

export default function Spinner(props: SpinnerColor) {
    const color = props.color ? props.color : "text-primary";
    return (
        <div className="d-flex justify-content-center">
            <div
                className={"spinner-border spinner-border-sm " + color}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};