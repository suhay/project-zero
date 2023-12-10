import { useCallback, useEffect, useRef } from "react";

import { Search } from "react-feather";

export function SearchBar({
  submitSearch,
}: {
  submitSearch: (value: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);

  const handleSubmitSearch = useCallback(() => {
    if (input.current == null) {
      return;
    }
    submitSearch(input.current.value || "");
    input.current.value = "";
    input.current.focus();
  }, [submitSearch]);

  useEffect(() => {
    const enterListener = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmitSearch();
      }
    };

    const inputField = input.current;
    inputField?.addEventListener("keypress", enterListener);

    return () => {
      inputField?.removeEventListener("keypress", enterListener);
    };
  }, [handleSubmitSearch, input, submitSearch]);

  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        placeholder="What do you need help looking for?"
        className="px-4 py-2 grow border border-gray-300 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        ref={input}
      />
      <button
        type="button"
        className="px-4 py-2 text-primary-500 rounded-md focus:outline-none"
        aria-label="Search"
        role="search"
        onClick={handleSubmitSearch}
      >
        <Search />
      </button>
    </div>
  );
}
