const ArchNode = ({ node, compact, dense, wide }) => (
    <div className={`arch-node ${compact ? "compact" : ""} ${dense ? "dense" : ""} ${wide ? "self-stretch justify-center" : ""}`}>
        <img src={node.icon} alt="" className={compact || dense ? "size-7" : "md:size-10 size-8"} />
        <div>
            <p className="font-semibold">{node.name}</p>
            <p className="text-white-50 text-xs">{node.detail}</p>
        </div>
    </div>
);

const ArchLink = ({ compact }) => <div className={`arch-link ${compact ? "h-8" : "md:h-12 h-8"}`} />;

const ArchitectureDiagram = ({ architecture, compact = false }) => {
    const { clients, server, database } = architecture;
    const dense = !compact && clients.length > 2;

    return (
        <div className="arch-panel">
            {/* The server node stretches to the clients row so every client link lands on it. */}
            <div className="flex flex-col items-center">
                <div className="flex justify-center md:gap-4 gap-2">
                    {clients.map((client) => (
                        <div key={client.name} className="flex flex-col items-center">
                            <ArchNode node={client} compact={compact} dense={dense} />
                            <ArchLink compact={compact} />
                        </div>
                    ))}
                </div>
                <ArchNode node={server} compact={compact} wide={clients.length > 1} />
            </div>
            <ArchLink compact={compact} />
            <ArchNode node={database} compact={compact} />
        </div>
    );
};

export default ArchitectureDiagram;
