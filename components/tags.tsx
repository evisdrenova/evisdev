export default function Tags({ text }: { text: string }) {
  return (
    <span className="px-1 py-[2px] text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300  rounded">
      {text}
    </span>
  );
}
