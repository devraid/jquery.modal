<?php
header("Content-Type: text/plain; charset=utf-8");
echo "**Parameters**\n";
print_r($_REQUEST);

echo "\n**Files**\n";
print_r($_FILES);
