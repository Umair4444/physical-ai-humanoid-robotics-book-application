import pytest
from src.agents.tool_registry import tool_registry, textbook_search_tool, calculate_kinematics_tool, explain_concept_tool


def test_tool_registry_registration():
    """
    Test that tools can be registered and retrieved from the registry.
    """
    # Register a test tool
    def test_tool(x: int) -> int:
        return x * 2
    
    tool_registry.register_tool(
        name="test_tool",
        description="A test tool that multiplies by 2",
        func=test_tool
    )
    
    # Retrieve the tool
    tool = tool_registry.get_tool("test_tool")
    
    assert tool.name == "test_tool"
    assert tool.description == "A test tool that multiplies by 2"
    assert tool.function(5) == 10


def test_tool_registry_execution():
    """
    Test that tools can be executed through the registry.
    """
    result = tool_registry.execute_tool("textbook_search", query="kinematics")
    
    assert "Search results for 'kinematics'" in result


def test_tool_registry_all_tools():
    """
    Test that all registered tools can be retrieved.
    """
    tools = tool_registry.get_all_tools()
    
    # Check that we have at least the example tools
    tool_names = [tool.name for tool in tools]
    assert "textbook_search" in tool_names
    assert "calculate_kinematics" in tool_names
    assert "explain_concept" in tool_names


def test_textbook_search_tool():
    """
    Test the textbook search tool directly.
    """
    result = textbook_search_tool("forward kinematics")
    
    assert "forward kinematics" in result
    assert "Search results for" in result


def test_calculate_kinematics_tool():
    """
    Test the calculate kinematics tool directly.
    """
    result = calculate_kinematics_tool("45,90,135")
    
    assert "45,90,135" in result
    assert "Kinematics calculation" in result


def test_explain_concept_tool():
    """
    Test the explain concept tool directly.
    """
    result = explain_concept_tool("PID controller")
    
    assert "PID controller" in result
    assert "Explanation of" in result


if __name__ == "__main__":
    pytest.main()