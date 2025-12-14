---
description: Development workflow, file hygiene, documentation architecture (5+1), and code architecture guidelines.
trigger: always_on
---
# 🛠️ DEV FLOW (Development Flow Rules)

## 1. Development Workflow
* **Incremental Development**: Never start coding immediately. Clarify all questions through iterative Q&A loops before implementation.
* **Structured Process**: Follow the SOP strictly: **Plan → Review → Task Breakdown → Execute**.

## 2. File Hygiene
* **Test Organization**: All test code must be placed in the `tests/` directory.
    * Subdirectory structures are allowed, e.g., `tests/login_module/test_api.py`.
    * **Never** create `temp/` or place test scripts directly in the root directory.
* **No Random Files**: Do not create new Markdown documents without explicit permission.

## 3. Documentation Architecture (The 5+1 Standard)
* **Front Door (Root)**: `README.md` (project root, for project overview and quick navigation only).
* **Brain (Context)**: All project context must be maintained in the `docs/meta/` directory:
    * `00_CONTEXT.md`: AI quick index page (tech stack + architecture snapshot + development red lines).
    * `01_TASKS.md`: Task token list (current focus + in progress).
    * `02_ARCHITECTURE.md`: System architecture diagrams and file mappings.
    * `03_CHANGELOG.md`: Detailed changelog and decision records.
    * `04_MEMO.md`: Temporary drafts and thought fragments (clear periodically).
* **Extension Zone (docs/)**: The `docs/` root can store user-defined important documents, no forced categorization.

## 4. Code Architecture Rules

### 4.1 Separation of Concerns
* **View Layer (View/UI)**: Must not contain business logic or database access code.
* **Business Layer (Service/Logic)**: Must not directly depend on frameworks or UI components; must be pure functions or pure classes.
* **Data Layer (Repository/DAO)**: Must not contain business rule decisions; only handles data read/write.
* **No Cross-Layer Calls**: View cannot call DAO directly; must go through Service.

### 4.2 Modularity Principles
* **Directory = Boundary**: Each feature module must have its own directory (e.g., `src/modules/inventory/`).
* **No Random File Creation**: Before adding new code files, confirm the appropriate module directory. If none exists, discuss whether to create a new module first.
* **Single Entry Point**: Each module's external interface should be exposed through `index.ts` / `__init__.py`.
* **Dependency Direction**: Common modules (`common/utils`) must not depend on business modules (`modules/xxx`).
