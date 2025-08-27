export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
	return <div>Admin News Detail Page ID: {id}</div>;
}

