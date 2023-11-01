const LinkedLists = () => {
  let headNode = null;
  const append = (val) => {
    // Append value to the end of the list
    if (!headNode) {
      headNode = Node(val);
    } else {
      recurseToTail(headNode).nextNode = Node(val);
    }
  };

  const prepend = (val) => {
    // Prepend value to the start of the list
    if (!headNode) {
      headNode = Node(val);
    } else {
      const node = Node(val, headNode);
      headNode = node;
    }
  };

  // Sum all nodes
  function recurseEach(node) {
    if (node.nextNode === null) {
      return 1;
    } else {
      return 1 + recurseEach(node.nextNode);
    }
  }

  const size = () => {
    // Returns the total number of nodes in the list
    return headNode === null ? 0 : recurseEach(headNode);
  };

  const head = () => {
    // Returns the first node in the list
    return headNode;
  };

  function recurseToTail(node) {
    if (node.nextNode === null) {
      return node;
    } else {
      return recurseToTail(node.nextNode);
    }
  }
  const tail = () => {
    // Returns the last node in the list
    return headNode === null ? headNode : recurseToTail(headNode);
  };

  function recurseUntil(n, node) {
    if (n === 0) {
      return node;
    } else {
      return recurseUntil(n - 1, node.nextNode);
    }
  }

  const at = (index) => {
    // Returns the node at the given index
    return recurseEach(headNode) - 1 < index
      ? "No object found!"
      : recurseUntil(index, headNode);
  };

  const pop = () => {
    // Removes the last element from the list
    if (headNode === null) {
      console.log("Cannot delete the linked lists is empty!");
    } else {
      if (recurseEach(headNode) === 1) {
        headNode = null;
      } else {
        recurseUntil(recurseEach(headNode) - 2, headNode).nextNode = null;
      }
    }
  };

  function recurseFind(node, value) {
    if (node.nextNode === null) {
      return node.value === value ? true : false;
    } else {
      if (node.value === value) {
        return true;
      } else {
        return recurseFind(node.nextNode, value);
      }
    }
  }

  const contains = (value) => {
    // Returns true if the passed in value in the list and otherwise returns false
    return headNode === null ? false : recurseFind(headNode, value);
  };

  // Return the index
  // This function doesn't work if the elements doesn't exist, and need to be used alongside other function
  function recurseFindIndex(node, value) {
    if (node.nextNode === null) {
      return node.value === value ? 1 : 0;
    } else {
      if (node.value === value) {
        return 1;
      } else {
        return recurseFindIndex(node.nextNode, value) + 1;
      }
    }
  }

  const find = (value) => {
    // Returns the index of the node containing the value, or null if not found
    if (headNode === null) {
      return false;
    } else {
      if (recurseFind(headNode, value)) {
        return recurseFindIndex(headNode, value) - 1;
      } else {
        return "No value found!";
      }
    }
  };

  function recurseString(node) {
    if (node.nextNode === null) {
      return `(${node.value}) => null`;
    } else {
      return `(${node.value}) => ` + recurseString(node.nextNode);
    }
  }
  const toString = () => {
    // Represents your linked list objects as strings, so you can print them out and preview them in the console. The format should be:
    // (value) => (value) => (value) => null
    return headNode === null ? "null" : recurseString(headNode);
  };

  function indexErrorMessage(index) {
    if (index > recurseEach(headNode) - 1) {
      console.log(
        "ERROR!, the index given is bigger than the linked lists size"
      );
    } else {
      console.log("ERROR! use index bigger or equal to 0");
    }
  }
  const insertAt = (value, index) => {
    //  InsertAt(value, index) that inserts a new node with the provided value at the given index.

    if (index > recurseEach(headNode) - 1 || index < 0) {
      indexErrorMessage(index);
    } else {
      if (index === 0) {
        const node = Node(value, headNode);
        headNode = node;
      } else {
        const before = recurseUntil(index - 1, headNode);
        const next = recurseUntil(index, headNode);
        console.log({ before, next });
        before.nextNode = Node(value, next);
      }
    }
  };

  const removeAt = (index) => {
    // RemoveAt(index) that removes the node at the given index.
    if (index > recurseEach(headNode) - 1 || index < 0) {
      indexErrorMessage(index);
    } else {
      if (index === 0) {
        const newHead = headNode.nextNode;
        headNode.nextNode = null;
        headNode = newHead;
        console.log({ headNode });
      } else {
        const current = recurseUntil(index, headNode);
        const before = recurseUntil(index - 1, headNode);
        const next = recurseUntil(index + 1, headNode);
        console.log({ before, current, next });
        current.nextNode = null;
        before.nextNode = next;
        //before.nextNode = Node(value, next);
      }
    }
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

const Node = (value = null, nextNode = null) => {
  return { value, nextNode };
};
