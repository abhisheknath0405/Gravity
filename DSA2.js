function twoSum(nums, target) {
    if (!nums || nums.length < 2) {
      throw new Error("Input array must have at least two elements");
    }
  
    const numToIndex = {};
  
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (numToIndex[complement] !== undefined) {
        return [numToIndex[complement], i];
      }
      numToIndex[nums[i]] = i;
    }
  
    throw new Error("No solution found");
  }
  
  // Example usage:
  const nums = [2, 7, 11, 15];
  const target = 9;
  console.log(twoSum(nums, target)); // Output: [0, 1]