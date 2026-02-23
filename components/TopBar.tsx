"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import "../styles.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
}

const TopBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setBooks([]);
      return;
    }

    const controller = new AbortController();

    const fetchBooks = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedSearch}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch books");

        const data: Book[] = await res.json();
        setBooks(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, [debouncedSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure></figure>

        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                type="text"
                className="search__input"
                placeholder="Search for books"
                value={search}
                onChange={handleInputChange}
              />
              <div className="search__icon">
                <FaMagnifyingGlass />
              </div>
            </div>
          </div>

          <div className="sidebar__toggle--btn">
            <IoIosMenu />
          </div>
        </div>

        {search && (
          <div className="search__books--wrapper">
            {loading || books.length === 0
              ? [1, 2, 3, 4, 5, 6].map((_, i) => (
                  <div key={i} className="search__book--link">
                    <div
                      className="skeleton"
                      style={{
                        width: "100%",
                        height: "90px",
                        marginBottom: "8px",
                      }}
                    ></div>
                  </div>
                ))
              : books.slice(0, 8).map((book) => (
                  <Link
                    href={`/dashboard/book/${book.id}`}
                    key={book.id}
                    className="search__book--link"
                    onClick={() => setSearch("")}
                  >
                    <div className="search__book--img-mask">
                      <img
                        src={book.imageLink}
                        alt={book.title}
                        className="search__book--img"
                      />
                    </div>
                    <div>
                      <div className="search__book--title">{book.title}</div>
                      <div className="search__book--author">{book.author}</div>
                    </div>
                  </Link>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
