// src/selection/select.js
// 该函数就是遍历 _groups 中每一个 group，再遍历每一个 group 下的 DOM，
// 使用 querySelector 查找该 DOM 底下的 DOM，组合成新的 subgroup，再组合成新的 subgroups
// 返回新的 Selection(subgroups, this._parents) ，_parent 与父节点保持一致。
function selection_select(select) {
  // select 经过 selector(select) 后，是一个方法，这个方法可能是一个空方法，或者是一个选择器。
  if (typeof select !== "function") select = selector(select);

  for (
    var groups = this._groups,
      m = groups.length,
      subgroups = new Array(m),
      j = 0;
    j < m;
    ++j
  ) {
    for (
      var group = groups[j],
        n = group.length,
        subgroup = (subgroups[j] = new Array(n)),
        node,
        subnode,
        i = 0;
      i < n;
      ++i
    ) {
      if (
        (node = group[i]) &&
        // ！！！就是在这边调用了 querySelector，在当前的 node 下查找
        (subnode = select.call(node, node.__data__, i, group))
      ) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

Selection.prototype = {
  constructor: Selection,
  select: selection_select,
  // selectAll: selection_selectAll,
  // filter: selection_filter,
  // data: selection_data,
  // enter: selection_enter,
  // exit: selection_exit,
  // join: selection_join,
  // merge: selection_merge,
  // order: selection_order,
  // sort: selection_sort,
  // call: selection_call,
  // nodes: selection_nodes,
  // node: selection_node,
  // size: selection_size,
  // empty: selection_empty,
  // each: selection_each,
  // attr: selection_attr,
  // style: selection_style,
  // property: selection_property,
  // classed: selection_classed,
  // text: selection_text,
  // html: selection_html,
  // raise: selection_raise,
  // lower: selection_lower,
  // append: selection_append,
  // insert: selection_insert,
  // remove: selection_remove,
  // clone: selection_clone,
  // datum: selection_datum,
  // on: selection_on,
  // dispatch: selection_dispatch,
};
