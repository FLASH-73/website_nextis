export function renderBlock(block, index) {
    switch (block.type) {
        case "title":
            return (
                <h1
                    key={index}
                    className="font-light tracking-tight text-gray-900 mb-16"
                    style={{ fontSize: "var(--text-hero)" }}
                >
                    {block.text}
                </h1>
            );
        case "paragraph":
            return (
                <p
                    key={index}
                    className="text-gray-700 leading-relaxed mb-6 font-light"
                    style={{ fontSize: "var(--text-body-lg)" }}
                >
                    {block.text}
                </p>
            );
        case "emphasis":
            return (
                <p
                    key={index}
                    className="text-gray-900 leading-relaxed mb-6 font-medium"
                    style={{ fontSize: "var(--text-body-lg)" }}
                >
                    {block.text}
                </p>
            );
        case "divider":
            return (
                <div key={index} className="my-12 flex justify-center">
                    <span className="block w-8 h-px bg-gray-300" />
                </div>
            );
        case "signature":
            return (
                <p
                    key={index}
                    className="text-gray-400 italic text-lg mt-8"
                >
                    {block.text}
                </p>
            );
        default:
            return null;
    }
}
