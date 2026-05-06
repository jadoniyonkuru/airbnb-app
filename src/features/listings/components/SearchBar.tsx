interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search listings..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}