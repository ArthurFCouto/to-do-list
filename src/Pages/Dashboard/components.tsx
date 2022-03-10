type Props = {
  children: React.ReactNode;
  func?: () => void;
  id: string;
  idParent: string;
  target: string;
  title: string;
};

export function AcordionItem({ children, func, id, idParent, target, title }: Props) {
  const test = (
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingOne">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          Accordion Item #1
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      ></div>
    </div>
  );
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`${id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${target}`}
          aria-expanded="false"
          aria-controls={`${target}`}
          onClick={func}
        >
          {title}
        </button>
      </h2>
      <div
        id={`${target}`}
        className="accordion-collapse collapse"
        aria-labelledby={`${id}`}
        data-bs-parent={`#${idParent}`}
      >
        {children}
      </div>
    </div>
  );
}
