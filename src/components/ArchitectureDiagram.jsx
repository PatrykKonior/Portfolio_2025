const ArchNode = ({ node, tier, wide }) => (
    <div className={`arch-node ${wide ? "self-stretch justify-center" : ""}`}>
        <img src={node.icon} alt="" className="size-7" />
        <div>
            <p className="mono arch-tier">{tier}</p>
            <p className="font-medium">{node.name}</p>
            <p className="text-muted text-xs">{node.detail}</p>
        </div>
    </div>
);

const ArchLink = () => <div className="arch-link" />;

const ArchitectureDiagram = ({ architecture }) => {
    const { clients, server, database } = architecture;

    return (
        <div className="arch-panel">
            {/* The server node stretches to the clients row so every client link lands on it. */}
            <div className="flex flex-col items-center">
                <div className="arch-clients">
                    {clients.map((client) => (
                        <div key={client.name} className="flex flex-col items-center">
                            <ArchNode node={client} tier="Client" />
                            <ArchLink />
                        </div>
                    ))}
                </div>
                <ArchNode node={server} tier="Server" wide={clients.length > 1} />
            </div>
            <ArchLink />
            <ArchNode node={database} tier="Data" />
        </div>
    );
};

export default ArchitectureDiagram;
