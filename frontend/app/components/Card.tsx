interface CardProps {
	title: string;
	children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
	return (
		<div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-4">
			<h2 className="text-lg font-semibold mb-2">{title}</h2>
			<div>{children}</div>
		</div>
	);
}
