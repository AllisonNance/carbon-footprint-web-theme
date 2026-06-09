"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { Close, Search } from "@carbon/icons-react";
import styles from "./SearchBar.module.css";

export interface SearchSuggestion {
  /** Unique id for the suggestion. */
  id: string;
  /** Display text. */
  text: string;
}

export interface SearchBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Placeholder text. */
  placeholder?: string;
  /** Controlled list of suggestions to show while typing. */
  suggestions?: SearchSuggestion[];
  /** Called on every input change. */
  onQueryChange?: (query: string) => void;
  /** Called when a suggestion is selected or Enter is pressed. */
  onSelect?: (value: string) => void;
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  function SearchBar(
    {
      placeholder = "Search",
      suggestions = [],
      onQueryChange,
      onSelect,
      className,
      ...rest
    },
    ref,
  ) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const handleChange = (value: string) => {
      setQuery(value);
      setActiveIndex(-1);
      onQueryChange?.(value);
      setIsOpen(value.length > 0);
    };

    const handleSelect = useCallback(
      (value: string) => {
        setQuery(value);
        setIsOpen(false);
        onSelect?.(value);
      },
      [onSelect],
    );

    const handleClear = () => {
      setQuery("");
      setIsOpen(false);
      setActiveIndex(-1);
      onQueryChange?.("");
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || suggestions.length === 0) {
        if (e.key === "Enter") {
          onSelect?.(query);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0) {
            handleSelect(suggestions[activeIndex].text);
          } else {
            onSelect?.(query);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setActiveIndex(-1);
          break;
      }
    };

    useEffect(() => {
      if (activeIndex >= 0 && listRef.current) {
        const item = listRef.current.children[activeIndex] as HTMLElement;
        item?.scrollIntoView({ block: "nearest" });
      }
    }, [activeIndex]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const root = (ref as React.RefObject<HTMLDivElement>)?.current;
        if (root && !root.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const highlightMatch = (text: string) => {
      if (!query) return text;
      const idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx === -1) return text;
      return (
        <>
          {text.slice(0, idx)}
          <strong className={styles.match}>{text.slice(idx, idx + query.length)}</strong>
          {text.slice(idx + query.length)}
        </>
      );
    };

    const classes = [styles.root, className].filter(Boolean).join(" ");
    const showSuggestions = isOpen && suggestions.length > 0;

    return (
      <div ref={ref} className={classes} role="combobox" aria-expanded={showSuggestions} aria-haspopup="listbox" {...rest}>
        <div className={styles.inputWrap}>
          <Search className={styles.searchIcon} size={20} />
          <input
            ref={inputRef}
            className={`${styles.input} type-body-01`}
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            role="searchbox"
            aria-autocomplete="list"
            aria-controls="search-listbox"
            aria-activedescendant={
              activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
            }
          />
          {query && (
            <button
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear search"
              type="button"
            >
              <Close size={20} />
            </button>
          )}
          <button
            className={styles.submitBtn}
            onClick={() => onSelect?.(query)}
            aria-label="Search"
            type="button"
          >
            <Search size={20} />
          </button>
        </div>

        {showSuggestions && (
          <ul
            ref={listRef}
            id="search-listbox"
            className={styles.suggestions}
            role="listbox"
          >
            {suggestions.map((s, i) => (
              <li
                key={s.id}
                id={`search-option-${i}`}
                className={[
                  styles.suggestion,
                  i === activeIndex ? styles.suggestionActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={() => handleSelect(s.text)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className="type-body-01">
                  {highlightMatch(s.text)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
