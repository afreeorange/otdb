const Annotation: React.FC<{
	uri?: string;
	className?: string;
	children: React.ReactNode;
}> = ({ uri, className, children }) => (
	<span
		className={`border px-1 rounded-md mx-1 inline-block ${
			children ? " hover:badge-accent" : null
		} ${className}`}
	>
		{uri ? <a href={uri}>{children}</a> : <>{children}</>}
	</span>
);

export default Annotation;
