const isEmail = (v: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  const minLen = (v: string, n: number) => {
return (v ?? '').trim().length >= n;
}

export { isEmail, minLen }

