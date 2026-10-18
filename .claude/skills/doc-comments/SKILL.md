---
name: doc-comments
description: Add a structured, enterprise-style documentation comment (Javadoc, JSDoc/TSDoc, Python docstring, Go doc comment, C# XML doc, etc.) to a specific function, method, or class. Use this whenever the user asks to "add doc comments", "add javadoc", "document this method/function", "write a docstring for X", or points at a function and says "document this" — in any language, even in a codebase that otherwise prefers minimal comments. This is an explicit, opt-in request: only apply this level of detail to the function(s) the user actually pointed at, never spread it to neighboring code.
---

# Doc comments

The user is deliberately asking for a full, structured doc comment on one
piece of code. Give them one in the idiomatic format for that language,
carrying the same shape as this reference example (Java/Javadoc):

```java
/**
 * Retrieves user account details by their unique identifier.
 *
 * <p>This method fetches data from the primary database and
 * enriches it with active cache attributes if available.</p>
 *
 * @param userId the unique primary key of the user; must not be null
 * @return a {@link UserResponseDto} containing profile and status details
 * @throws UserNotFoundException if no user record exists for the given ID
 * @since 1.2.0
 */
```

## The shape to preserve, regardless of language

1. **Summary line** — one sentence, what it does.
2. **Expanded description** (optional) — only if there's real nuance: a
   side effect, a caching/fallback behavior, a non-obvious constraint. Skip
   it for simple, self-explanatory methods rather than padding for length.
3. **Tagged metadata**, one line per item, in this order:
   - a parameter tag for every parameter
   - a return tag, only if the function returns something (skip for void/None)
   - an error tag for every exception/error the function documents itself as
     raising (skip if it doesn't throw/raise anything notable)
   - a version tag, **only if** the surrounding codebase already uses one
     (grep the file or a few neighboring files for an existing version-tag
     convention before adding one — don't invent versioning that isn't
     already there)

Before writing, check for an existing local convention: if the file or
its neighbors already use a particular docstring style (e.g. reST-style
`:param:` in Python, or a specific JSDoc tag order), match that instead of
the default below — consistency with the surrounding file wins.

## Per-language templates

**Java — Javadoc**
```java
/**
 * <Summary.>
 *
 * <p><Expanded description, if needed.></p>
 *
 * @param name <description; note nullability/constraints>
 * @return <description>
 * @throws ExceptionType <condition that triggers it>
 */
```

**TypeScript / JavaScript — JSDoc/TSDoc**
```ts
/**
 * <Summary.>
 *
 * <Expanded description, if needed.>
 *
 * @param name - <description>
 * @returns <description>
 * @throws {ErrorType} <condition>
 */
```
In TypeScript, skip `@param`/`@returns` types (the type annotations already
carry that) — describe intent, not the type.

**Python — docstring (default: Google style)**
```python
def fetch_user(user_id: int) -> UserResponseDto:
    """<Summary.>

    <Expanded description, if needed.>

    Args:
        user_id: <description; note nullability/constraints>

    Returns:
        <description>

    Raises:
        UserNotFoundError: <condition>
    """
```
Use reST style (`:param:`, `:returns:`, `:raises:`) instead if that's what
the file/project already uses.

**Go — doc comment**
Idiomatic Go doesn't use `@param`/`@return`-style tags, and uses error
return values rather than exceptions — don't force Java-shaped tags onto
it. Start with the identifier's name, keep it prose, cover the same
information in plain sentences:
```go
// FetchUser retrieves user account details by their unique identifier.
//
// It fetches from the primary database and falls back to cached data
// if the primary lookup fails. Returns an error if no user exists for id.
func FetchUser(id int) (*UserResponseDto, error) {
```

**C# — XML doc comments**
```csharp
/// <summary>
/// <Summary.>
/// </summary>
/// <param name="userId"><description></param>
/// <returns><description></returns>
/// <exception cref="UserNotFoundException"><condition></exception>
```

**Other languages** — apply the same shape (summary, optional expanded
description, per-parameter note, return note, error note) using that
language's native doc-comment syntax (e.g. `#'` roxygen2 for R, `"""` for
Rust's `///`-doc convention, PHPDoc `/** */` for PHP).

## Scope discipline

Only touch the function(s)/method(s)/class the user pointed at. Don't use
this as an excuse to backfill doc comments across the rest of the file —
if they want that, they'll ask.
