function justifyText(text: string) {
  const paragraphs = text.split("\n");
  const justifiedParagraphs = paragraphs.map((paragraph) => {
    const words = paragraph.split(" ").filter((word) => word !== "");
    const justifiedText = [];
    let currentLine: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const lineLength = currentLine.join(" ").length;

      if (lineLength + word.length + 1 <= 80) {
        currentLine.push(word);
      } else {
        if (currentLine.length > 0) {
          justifiedText.push(justifyLine(currentLine));
        }
        currentLine = [word];
      }
    }

    if (currentLine.length > 0) {
      justifiedText.push(currentLine.join(" "));
    }

    return justifiedText.join("\n");
  });

  return justifiedParagraphs
    .filter((paragraph) => paragraph.trim() !== "")
    .join("\n");
}

function justifyLine(words: string[]) {
  let line = words.join(" ");
  const extraSpaces = 80 - line.length;

  if (words.length === 1) {
    return line;
  }

  let spaceSlots = words.length - 1;
  let spaces = new Array(spaceSlots).fill(1);

  for (let i = 0; i < extraSpaces; i++) {
    spaces[i % spaceSlots]++;
  }

  let justifiedLine = words[0];
  for (let i = 0; i < spaceSlots; i++) {
    justifiedLine += " ".repeat(spaces[i]) + words[i + 1];
  }

  return justifiedLine;
}

export { justifyText };
