export function FormatDateBR(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function FormatDateEN(date: string) {
    const newDate = new Date(date);
    const dateReturn = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate() + 1
      );
    return new Date(dateReturn).toLocaleDateString("en-US", { timeZone: "UTC" });
}