export interface AppContextType {
  searchTerm: string;
  handleSearch: (query: string) => void;
  mockItems: TileProps[];
}

export interface ButtonProps {
  children: any;
  className?: string;
  onClick: () => void;
}

export interface ColumnProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export interface RowProps {
  className?: string;
  style?: React.CSSProperties;
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

export interface GridProps {
  gapSize?: string;
  min?: string;
  children: React.ReactNode;
  className?: string;
}
