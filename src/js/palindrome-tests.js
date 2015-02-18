describe("palindrome works", function() {
  it("if it doesn't see a palindrome it returns false", function() {
    expect(isPalindrome('Mommy')).toBe(false);
  });
  it("sees a palindrome and returns true", function() {
    expect(isPalindrome('mom')).toBe(true);
  });
  it("still works with uppercase characters", function() {
    expect(isPalindrome('Radar')).toBe(true);    
  });

});
