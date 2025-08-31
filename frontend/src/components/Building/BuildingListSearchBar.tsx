import { useState } from 'react';

import { SearchIcon } from '@/assets/assets';
import Input from '@/components/_common/Input/Input';
import theme from '@/styles/theme';

function BuildingListSearchBar({ onSearch, style }: { onSearch: (term: string) => void; style?: React.CSSProperties }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputValue = searchTerm;

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div style={{ position: 'relative', ...style }}>
      <Input
        value={inputValue}
        placeholder="건물명, 위치"
        onChange={e => {
          setSearchTerm(e.target.value);
          handleSearch();
        }}
      />
      <SearchIcon
        stroke={theme.color.gray[400]}
        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
}

export default BuildingListSearchBar;
