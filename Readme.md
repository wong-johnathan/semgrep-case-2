# Semgrep Findings Export Script

This script retrieves all Semgrep code findings from every deployment in your Semgrep account and saves them as JSON files. Each deployment gets its own `<deployment_slug>.json` file, making it easy to ingest the data into analytics platforms or a data warehouse.

You can filter findings by date. Setting `DATE=2024-01-01` exports all findings since January 1, 2024 (interpreted in GMT and converted to epoch automatically).

## Requirements

* **Node.js (v16 or later)**
* **npm** (bundled with Node)

Check your installation:

```
node -v
npm -v
```

---

## Setup Instructions

1. **Clone the repository**

   ```
   git clone <repo_url>
   ```

2. **Open the project**
   Open the folder in any IDE or editor.

3. **Configure environment variables**

   * Rename `.env.example` to `.env`
   * Fill in the required values:

     ```
     SEMGREP_APP_TOKEN=<your_semgrep_api_token>
     # Example: 2024-01-01 (Date is in GMT and will be converted to epoch)
     DATE=2024-01-01
     ```

### How to Create a Semgrep App Token

1. Navigate to
   `https://semgrep.dev/orgs/<your_org>/settings/tokens`
2. Click **Create new token**
3. Check the **Web API** permission
4. Copy and securely store the **Secret value**
5. Click **Save**

Paste the token into your `.env` file under `SEMGREP_APP_TOKEN`.

---

4. **Install dependencies**

   ```
   npm install
   ```

5. **Run the script**

   ```
   npm run start
   ```

6. **Retrieve the exported files**
   JSON output files will appear in:

   ```
   ./exports/<deployment_slug>.json
   ```

---

## Notes

* The script uses `axios` to call the Semgrep API.
* Pagination is handled automatically until all findings are collected.
* JSON output is formatted with 2-space indentation.
* Dates must be in `YYYY-MM-DD` format.

---

You can extend this workflow with automated ingestion steps if you want the findings to flow directly into your data warehouse.
