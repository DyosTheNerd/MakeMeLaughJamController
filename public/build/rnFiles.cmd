for %%F in (".\*") do (
    rem Check if the file has a .txt extension
    if "%%~xF"==".data" (
        rem Rename the file to new_filename.txt
        ren "%%F" "webgl.data"
    )

    if "%%~xF"==".wasm" (
        rem Rename the file to new_filename.docx
        ren "%%F" "build.wasm"
    )

    if "%%~xF"==".framework.js" (
            rem Rename the file to new_filename.docx
            ren "%%F" "build.framework.js"
    )


)


for %%F in (".\*.loader.js") do (
    ren "%%F" "loader.js"
)

for %%F in (".\*.framework.js") do (
    ren "%%F" "build.framework.js"
)
