export interface AppContextType {
  searchTerm: string;
  handleSearch: (query: string) => void;
}

export interface ButtonProps {
  children: any;
  className?: string;
  onClick: () => void;
}

export interface ColumnProps {
  className?: string;
  children: React.ReactNode;
}

export interface RowProps {
  className?: string;
  children: React.ReactNode;
}

export interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export interface TileProps {
  id: string | number;
  name: string;
  owner: string;
  link: string;
}

export interface TrackProps {
  items: TileProps[];
}
