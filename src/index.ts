const start = async (): Promise<void> => {
  console.log('Hello there');
};

console.log('Info: Start Program');
start().then(() => {
  console.log('Info: End Program');
});
