
type PostFilterProps = {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

const PostFilter = ({searchQuery, onSearchChange}:PostFilterProps) => (
   <div className="mb-6">
    <input type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1" />
   </div>
)
export default PostFilter;