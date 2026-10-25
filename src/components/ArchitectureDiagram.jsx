const ArchNode = ({ node, compact }) => (
    <div className={`arch-node ${compact ? "compact" : ""}`}>
        <img src={node.icon} alt="" className={compact ? "size-7" : "md:size-10 size-8"} />
        <div>
            <p className="font-semibold">{node.name}</p>
            <p className="text-white-50 text-xs">{node.detail}</p>
        </div>
    </div>
);

const ArchLink = ({ compact }) => <div className={`arch-link ${compact ? "h-5" : "md:h-12 h-8"}`} />;

const ArchitectureDiagram = ({ architecture, compact = false }) => {
    const { clients, server, database } = architecture;

    return (
        <div className="arch-panel">
            <div className="flex flex-wrap justify-center md:gap-6 gap-3">
                {clients.map((client) => (
                    <div key={client.name} className="flex flex-col items-center">
                        <ArchNode node={client} compact={compact} />
                        <ArchLink compact={compact} />
                    </div>
                ))}
            </div>
            <ArchNode node={server} compact={compact} />
            <ArchLink compact={compact} />
            <ArchNode node={database} compact={compact} />
        </div>
    );
};

export default ArchitectureDiagram;
