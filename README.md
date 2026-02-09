# nickname-and-diminutive-names-lookup
A simple CSV file containing US given names (first name) and their associated nicknames or diminutive names.

This lookup file was initially created by mining this
<a href="http://www.caagri.org/nicknames.html">genealogy page</a>. Because the lookup originates from a dataset used for genealogy purposes there are old names that aren't commonly used these days, but there are recent ones as well. Examples are "gregory", "greg", or "geoffrey", "geoff". There was also a significant effort to make it machine readable, i.e. separate it with commas, remove human conventions like "rickie(y)" would need to be made into two different names "rickie", and "ricky".

This is a relatively large list with roughly 1600 names. Any help from people to clean this list up and add to it is greatly appreciated.

This project was created by <a href="http://www.odu.edu/">Old Dominion University</a> - <a href="http://ws-dl.blogspot.com/">Web Science and Digital Libraries Research Group</a>. More information about the creation of this lookup can be found <a href="https://ws-dl.blogspot.com/2010/08/lookup-for-nicknames-and-diminutive.html">here</a>.

## Parsers

There are parsers provided for convenience in Java, JavaScript/TypeScript, Perl, Python, and R.

### JavaScript / TypeScript

Install from npm:

```bash
npm install nicknames-curated
```

Usage:

```ts
import { NameDenormalizer } from "nicknames-curated";

const nd = new NameDenormalizer();

// Safe lookup — returns undefined if the name is not found
nd.get("greg");    // Set { "gregory", "gory" }
nd.get("Gregory"); // Set { "greg", "gory" }  (case-insensitive)
nd.get("xyz");     // undefined

// Strict lookup — throws an Error if the name is not found
nd.lookup("greg"); // Set { "gregory", "gory" }
nd.lookup("xyz");  // throws Error: Name not found: xyz
```

### Python

```python
from python_parser import NameDenormalizer

nd = NameDenormalizer()
nd["greg"]          # {'gregory', 'gory'}
nd.get("greg")      # {'gregory', 'gory'}
nd.get("xyz")       # None
```
