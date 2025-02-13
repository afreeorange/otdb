const Component: React.FC<{
	compact?: boolean;
}> = ({ compact = true }) => (
	<div
		className={`${compact && "badge-xs"} badge badge-outline px-1 rounded-md`}
	>
		Glaucoma
	</div>
);

export default Component;
