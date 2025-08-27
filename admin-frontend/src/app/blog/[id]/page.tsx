export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
	return <div>Admin Blog Detail Page ID: {id}</div>;
}

